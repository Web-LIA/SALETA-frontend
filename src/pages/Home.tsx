import React from 'react'
import imagemEncontrar from '../assets/home/EncontrarItem.png'
import imagemGuardar from '../assets/home/GuardarItem.png'
import themes from '../themes/home.module.scss'

function Home(){
    return (
        <div className={themes.home}>
            <img src="" alt="?" className={themes.sobre}/>
            <a href="" className={themes.itemHome}>
                <img src={imagemEncontrar} alt="GUARDAR" />
                <p>Guardar Item</p>
            </a>
            <a href="" className={themes.itemHome}>
                <img src={imagemGuardar} alt="ENCONTRAR" />
                <p>Encontrar Item</p>
            </a>
        </div>     
    )
}

export default Home