import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import { WebCamPhotoProps } from "../../types/itemTypes";
import themes from "../../themes/new-item-form.module.scss"

function WebCamPhoto(props: WebCamPhotoProps) {
  const itemPhoto = props.photo;
  const setItemPhoto = props.setPhoto; 
  const webcamRef = useRef<Webcam | null>(null);

  function capture() {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setItemPhoto(imageSrc);
      }
    }
  };
  function reset(){
    setItemPhoto("");
  }

  return (
    <>
    {!itemPhoto ? (
      <div className={themes.camera}>
        {/* Exibe o componente da webcam */}
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width="350px"
          height="350px"
        />
        <button onClick={capture} type="button">
          Tirar Foto
        </button>
      </div>
    ):(
      <div className={themes.foto}>
        {/* Exibe a imagem capturada ao lado da webcam */}
        {(itemPhoto!="") && (
          <>
            <img
              src={itemPhoto}
              alt="" // colocar uma imagem alternativa depois
            />
            <button onClick={reset}   type="button">
              Tirar Outra Foto
            </button>
          </>
        )}
      </div>
    )}
      

      
    </>
  );
};

export default WebCamPhoto;
