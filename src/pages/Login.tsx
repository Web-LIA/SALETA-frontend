import React,{ useEffect, useState }  from "react";
import loginProps from "../types/loginProps";
import style from "../themes/loginstyle.module.scss";
import { PiUserCircleFill } from "react-icons/pi";
import Input from "../components/login/Input";
import { Route, Routes } from "react-router";
import Visitante from "./Visitante";

export const ContextLogin = React.createContext<any>({
    user:'',setUser:()=>{},password:'',setPassword:()=>{}
});

const Login:React.FC<loginProps> = ({tipo})=>{
    const [user,setUser] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Dados que serão enviados no POST
        const data = { user,password};
            
        try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST", // Método POST
            headers: {
            "Content-Type": "application/json", // Tipo do conteúdo enviado
            },
            body: JSON.stringify(data), // Corpo da requisição em JSON
        });

        if (response.ok) {
            const json = await response.json();
            console.log("Resposta do servidor:", json);
            alert("Dados enviados com sucesso!");
        } else {
            console.error("Erro na requisição:", response.statusText);
        }
        } catch (error) {
        console.error("Erro na conexão:", error);
        }
        
        
      };
    return (
        <>
        <header>
            
        </header>
        <Routes>
            <Route path="/" element =  {
                <main className={style.login}>  
                    <PiUserCircleFill width="450px" height="450px"/>
                    <form onSubmit={handleSubmit}>
                        
                        <div>
                            <ContextLogin.Provider value= {{user,setUser}}>
                                <Input label = "Usuário" type="text" name="user" title="Usuário" set = "User" url = "login" required = {true}/>
                            </ContextLogin.Provider>
                            <ContextLogin.Provider value= {{password,setPassword}}>
                                <Input label = "Senha" type="password" name="password" title="Senha" set= "Password" url = "login" required = {true} />
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