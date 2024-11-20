import loginProps from "./loginProps";
import Input from "./components/Input";
import React, { useState } from "react";
import CameraCapture from "./components/Foto";

export const ContextVisitante = React.createContext<any>({
    user:'',setUser:()=>{},password:'',setPassword:()=>{}
});

const Visitante:React.FC<loginProps> = (props) =>{
    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [cpf,setCpf] = useState<string>("");
    const [user,setUser] = useState<string>("");
    const [password,setPassword] = useState<string>("");

    return (
        <main>
            <h1>TESTE</h1>
            <CameraCapture/>
        </main>
    )
}
export default Visitante;