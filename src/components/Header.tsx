import React from 'react'
import themes from '../themes/header.module.scss'

interface HeaderProps{
    titulo:string
}

function Header(props:HeaderProps){
    return (
        <header className={themes.header}>
                <p>{props.titulo}</p>
        </header>
    )
}

export default Header