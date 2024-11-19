import React from 'react'
import imagemEncontrar from '../assets/home/EncontrarItem.png'
import imagemGuardar from '../assets/home/GuardarItem.png'

function Home(){
    return (
        <div className='home'>
            <img src="" alt="?" className='sobre'/>
            <a href="" className='itemHome'>
                <img src="" alt="ENCONTRAR" />
                <p>Encontrar Item</p>
            </a>
            <a href="" className='itemHome'>
                <img src={imagemEncontrar} alt="GUARDAR" />
                <p>Guardar Item</p>
            </a>
            <a href="" className='itemHome'>
                <img src={imagemGuardar} alt="ENCONTRAR" />
                <p>Guardar Item</p>
            </a>
        </div>     
    )
}

export default Home