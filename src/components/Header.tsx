import React from 'react'

interface HeaderProps{
    titulo:string
}

function Header(props:HeaderProps){
    return (
        <>
            <header>
                <p>{props.titulo}</p>
            </header>
        </>
    )
}

export default Header