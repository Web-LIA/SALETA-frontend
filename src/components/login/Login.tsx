import React,{ useEffect, useState }  from "react"
import loginProps from "./loginProps";
import style from "./themes/loginstyle.module.scss";
import { PiUserCircleFill } from "react-icons/pi";
import Input from "./components/Input";

export const Context = React.createContext<any>({
    user:'',setUser:()=>{},password:'',setPassword:()=>{}
});
const Login:React.FC<loginProps> = ({tipo})=>{
    const [user,setUser] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    return (
        <>
        
        <header>
            
        </header>
        <main className={style.login}>  
            <PiUserCircleFill width="450px" height="450px"/>
            <form action="" method="post">
                
                <div>
                    <Context.Provider value= {{user,setUser}}>
                        <Input label = "Usuário" type="text" name="user" title="Usuário" set = "User"/>
                    </Context.Provider>
                    <Context.Provider value= {{password,setPassword}}>
                    <Input label = "Senha" type="password" name="password" title="Senha" set= "Password"/>
                    </Context.Provider>
                </div>
                
                <button type="submit">Entrar</button>
            </form>
            <a href="/visitante">Visitante?</a>
        </main>

        </>
    )
}

export default Login;