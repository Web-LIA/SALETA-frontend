import loginProps from "./loginProps";
import Input from "./components/Input";
import React, { useEffect, useState } from "react";
import CameraCapture from "./components/Foto";
import style from "./themes/loginstyle.module.scss"
export const ContextVisitante = React.createContext<any>({
    name:'',setName:()=>{},
    email:'',setEmail:()=>{},
    cpf:'',setCpfMascara:()=>{},
});

const Visitante:React.FC<loginProps> = (props) =>{
    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [cpf,setCpf] = useState<string>("");


    const setCpfMascara = (valor:string) => {
        let value = valor.replace(/\D/g, ""); // Remove tudo que não for número
        value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o primeiro ponto
        value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o segundo ponto
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca o traço
        setCpf(value); // Atualiza o estado com o CPF formatado
    };
    return (
        <main className={style.visitante}>
            
            <form action="">
            <CameraCapture/>
                <div >
                    <ContextVisitante.Provider value= {{name,setName}}>
                        <Input label = "Nome Completo" type = "text" name = "name" set="Name" title ="Nome Completo" placeholder="Digite seu nome..." required = {true} url = "visitante"/>
                    </ContextVisitante.Provider>
                    <ContextVisitante.Provider value= {{email,setEmail}}>
                        <Input label = "Email" type = "text" name = "email" set="Email" title ="Email" placeholder="Digite seu email..." required = {true} url = "visitante"/>
                    </ContextVisitante.Provider>
                    <ContextVisitante.Provider value= {{cpf,setCpfMascara}}>
                        <Input label = "CPF" type = "text" name = "cpf" set="CpfMascara" title ="CPF" placeholder="000.000.000-00" required = {true} url = "visitante"/>
                    </ContextVisitante.Provider>
                    
                </div>
                <button
                    type="submit"
                    >
                        Cadastrar
                </button>
            </form>
        </main>
        
    )
}
export default Visitante;