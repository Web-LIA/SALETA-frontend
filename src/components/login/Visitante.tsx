import loginProps from "./loginProps";
import Input from "./components/Input";
import React, { useState } from "react";
import CameraCapture from "./components/Foto";

export const Context = React.createContext<any>({
    name:'',setName:()=>{},
    email:'',setEmail:()=>{},
    cpf:'',setCpf:()=>{},
});

const Visitante:React.FC<loginProps> = (props) =>{
    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [cpf,setCpf] = useState<string>("");

    const formatCPF = (value: string) => {
        // Remove tudo que não é número
        const numericValue = value.replace(/\D/g, "");
    
        // Aplica a máscara
        const maskedValue = numericValue
          .replace(/^(\d{3})(\d)/, "$1.$2")
          .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
          .replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");
    
        return maskedValue;
    };
    
    return (
        <main>
            <CameraCapture/>
            <Context.Provider value= {{name,setName}}>
                <Input label = "Nome Completo" type = "text" name = "name" set="Name" title ="Nome Completo" placeholder="Digite seu nome..." required = {true} url = "../Visitante"/>
            </Context.Provider>
            <Context.Provider value= {{email,setEmail}}>
                <Input label = "Email" type = "text" name = "email" set="Email" title ="Email" placeholder="Digite seu email..." required = {true} url = "../Visitante"/>
            </Context.Provider>
            <Context.Provider value= {{cpf,setCpf}}>
                <Input label = "CPF" type = "text" name = "cpf" set="Cpf" title ="CPF" placeholder="000.000.000-00" required = {true} url = "../Visitante"/>
            </Context.Provider>
            
        </main>
    )
}
export default Visitante;