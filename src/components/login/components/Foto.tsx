import React, { useRef, useState, useEffect } from "react";

const CameraCapture: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null); // Referência ao <video>
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // Referência ao <canvas>
  const [photo, setPhoto] = useState<string | null>(null); // Armazena a foto capturada

  // Configura a câmera ao montar o componente
  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Erro ao acessar a câmera: ", error);
      }
    };
    startCamera();
  }, []);

  // Captura a foto e renderiza no canvas
  const handleCapture = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext("2d");
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        setPhoto(canvas.toDataURL("image/png")); // Salva a foto em Base64
      }
    }
  };

  // Libera a câmera quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Capturar Foto com a Câmera</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", maxWidth: "500px" }}
      />
      <button
        onClick={handleCapture}
        style={{ marginTop: "10px", padding: "10px 20px" }}
      >
        Capturar Foto
      </button>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      {photo && (
        <div>
          <h2>Foto Capturada:</h2>
          <img src={photo} alt="Captura" style={{ maxWidth: "100%" }} />
          <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = photo;
              link.download = "foto.png";
              link.click();
            }}
            style={{ marginTop: "10px", padding: "10px 20px" }}
          >
            Baixar Foto
          </button>
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
