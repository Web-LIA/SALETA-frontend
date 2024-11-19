import React from "react"
import loginProps from "./loginProps";
import style from "./themes/loginstyle.module.scss";
import { PiUserCircleFill } from "react-icons/pi";
import Input from "./components/Input";

const Login:React.FC<loginProps> = ({tipo})=>{

    return (
        <>
        <header>
            
        </header>
        <main className={style.login}>  
            <PiUserCircleFill width="450px" height="450px"/>
            <Input label = "Usuário" type="text" name="user" title="Usuário"/>
            <Input label = "Senha" type="text" name="password" title="Senha"/>
            <button>Entrar</button>
            <a href="/visitante">Visitante?</a>
        </main>
        </>
    )
}

export default Login;