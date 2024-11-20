import React, { useRef, useEffect, useState, useContext } from "react";
import * as faceapi from "face-api.js";
import { FaCheckCircle } from "react-icons/fa";
import { IoIosCloseCircle } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import style from "./fotostyle.module.scss"
import { ContextVisitante } from "../Visitante";

const CameraFaceDetector: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Referência ao vídeo
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Referência ao canvas
  const [isCameraReady, setIsCameraReady] = useState(false); // Controle de estado para a câmera
  const [hasFace, setHasFace] = useState<boolean | null>(null); // Resultado da detecção
  const {photo, setPhoto} = useContext(ContextVisitante); // Armazena a foto capturada
  // Carregar modelos do face-api.js
  const loadModels = async () => {
    const MODEL_URL = "/models"; // Pasta onde os modelos estão armazenados
    await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);
    console.log("Modelos carregados.");
  };

  // Ativar câmera do usuário
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
      }
      setIsCameraReady(true);
    } catch (error) {
      console.error("Erro ao acessar a câmera: ", error);
      setIsCameraReady(false);
    }
  };
  

  // Detectar rostos em tempo real
  const detectFaces = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      // Ajusta o tamanho do canvas para o vídeo
      const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight,
      };
      faceapi.matchDimensions(canvas, displaySize);

      // Detecta rostos no feed da câmera
      const detections = await faceapi.detectAllFaces(video);
      setHasFace(detections.length > 0);

      // Atualiza o canvas com as detecções
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      const context = canvas.getContext("2d");
      if (context) context.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas
      faceapi.draw.drawDetections(canvas, resizedDetections);
    }
  };

  // Efeito para carregar modelos e iniciar a câmera
  useEffect(() => {
    loadModels();
    startCamera();
  }, []);
   // Captura a foto e renderiza no canvas
   const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video && hasFace) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setPhoto(canvas.toDataURL("image/png")); // Salva a foto em Base64
      }
    }
  };
  // Efeito para rodar a detecção continuamente
  useEffect(() => {
    if (isCameraReady) {
      const interval = setInterval(() => {
        detectFaces();
      }, 100); // Detecta rostos a cada 100ms
      return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    }
  }, [isCameraReady]);
  return (
    <div className={style.foto} style={{ textAlign: "center" }}>
      {photo ?(
        <>
            <div className={style.imagem}>
                <img src={photo} alt="Captura" style={{ maxWidth: "100%" }}/>
            </div>
           
            <div className={style.botoes}>
                <button
                onClick={()=>{
                    setPhoto(null);
                    setHasFace(null);
                    setIsCameraReady(false);
                    loadModels();
                    startCamera();
                }}
                style={{backgroundColor: "#CD191E"}}
                type="button"
                >
                    Tentar Novamente
                </button>
            </div>
            
        </>
      ):(
      <>
        <div style={{ position: "relative", display: "inline-block" }} className={style.imagem}>
            <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: "100%", maxWidth: "600px" }}
            />
            <canvas
            ref={canvasRef}
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
            }}
            />
        </div>
        <div className={style.botoes}>
        <>
            {hasFace === null
            ? <IoReload/>
            : hasFace
            ? <FaCheckCircle color = "#2F9E41"/> 
            : <IoIosCloseCircle color = "#CD191E"/>
            }
        </>
        <button
            onClick={handleCapture}
            style={{ marginTop: "10px", padding: "10px 20px",  backgroundColor: "#2F9E41"}}
            type="button"
        >
            Tirar foto do rosto
        </button>
        </div>
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </>
    )}
    
    </div>
  );
};

export default CameraFaceDetector;
