import React,{ useEffect, useState }  from "react"
import loginProps from "../types/loginProps";
import style from "../themes/loginstyle.module.scss";
import { PiUserCircleFill } from "react-icons/pi";
import Input from "../components/login/Input";
import { Route, Routes, useNavigate } from "react-router";
import Visitante from "./Visitante";
import api from "../services/api";
import Header from "../components/Header";

export const ContextLogin = React.createContext<any>({
    login:'',setLogin:()=>{},password:'',setPassword:()=>{}
});
const Login:React.FC<loginProps> = ({tipo})=>{ 

    const [login,setLogin] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    let navigate = useNavigate();
    async function postUsers() {
        const response = await api.post('/login', {
            login,
            password
        })
        
        if(response.data.error){
            alert(response.data.error);
            return false;
        }else{
            alert("Logado com sucesso!");
            return response.data
        }
        
    }

    const HandleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Dados que serão enviados no POST
        if( await postUsers()){
            console.log("LOGADO")
            
            switch(tipo){
                case "buscar":
                    navigate("/sessao")
                    break;
                case "guardar":
                    navigate("/cadastrar-novo-item")
                    break;
                default:
                    break;
            }
        }
        
      };
    return (
        <>
        <Header titulo="LOGIN"/>
        <Routes>
            <Route path="/" element =  {
                <main className={style.login}> 
                    <PiUserCircleFill width="450px" height="450px"/>
                    <form onSubmit={HandleSubmit}>
                        
                        <div>
                            <ContextLogin.Provider value= {{login,setLogin}}>
                                <Input label = "Usuário" type="text" name="login" title="Usuário" set = "Login" url = "login" required = {true}/>
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