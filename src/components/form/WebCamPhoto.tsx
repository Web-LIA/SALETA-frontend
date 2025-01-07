import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { WebCamPhotoProps } from "../../types/itemTypes";

function WebCamPhoto(props: WebCamPhotoProps) {
  const itemPhoto = props.photo;
  const setItemPhoto = props.setPhoto; 
  const webcamRef = useRef<Webcam | null>(null);

  function capture() {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setItemPhoto(imageSrc);
        console.log("Foto capturada em base64:", imageSrc);
      }
    }
  };

  return (
    <>
      <div>
        {/* Exibe o componente da webcam */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="50%"
        />
        <button onClick={capture}>
          Tirar Foto
        </button>
      </div>

      <div>
        {/* Exibe a imagem capturada ao lado da webcam */}
        {(itemPhoto!="") && (
          <img
            src={itemPhoto}
            alt="" // colocar uma imagem alternativa depois
          />
        )}
      </div>
    </>
  );
};

export default WebCamPhoto;
