import React,{ useEffect, useState }  from "react"
import loginProps from "./loginProps";
import style from "./themes/loginstyle.module.scss";
import { PiUserCircleFill } from "react-icons/pi";
import Input from "./components/Input";
import { Route, Routes } from "react-router";
import Visitante from "./Visitante";

export const ContextLogin = React.createContext<any>({
    user:'',setUser:()=>{},password:'',setPassword:()=>{}
});
const Login:React.FC<loginProps> = ({tipo})=>{
    const [user,setUser] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    return (
        <>
        <header>
            
        </header>
        <Routes>
            <Route path="/" element =  {
                <main className={style.login}>  
                    <PiUserCircleFill width="450px" height="450px"/>
                    <form action="" method="post">
                        
                        <div>
                            <ContextLogin.Provider value= {{user,setUser}}>
                                <Input label = "Usuário" type="text" name="user" title="Usuário" set = "User" url = "login"/>
                            </ContextLogin.Provider>
                            <ContextLogin.Provider value= {{password,setPassword}}>
                                <Input label = "Senha" type="password" name="password" title="Senha" set= "Password" url = "login" />
                            </ContextLogin.Provider>
                        </div>
                        
                        <button type="submit">Entrar</button>
                    </form>
                    <a href="/login/visitante">Visitante?</a>
                </main>
            }/>

            <Route path = "/visitante" element = {<Visitante tipo = {tipo}/>}/>
        </Routes>
        </>
    )
}

export default Login;