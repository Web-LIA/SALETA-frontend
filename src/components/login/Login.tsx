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
            <form action="" method="post">
                <div>
                    <Input label = "Usuário" type="text" name="user" title="Usuário"/>
                    <Input label = "Senha" type="password" name="password" title="Senha"/>
                </div>
                <button type="submit">Entrar</button>
            </form>
            <a href="/visitante">Visitante?</a>
        </main>
        </>
    )
}

export default Login;