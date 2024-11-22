import loginProps from "../types/loginProps";
import Input from "../components/login/Input"; 
import React, { useEffect, useState } from "react";
import CameraCapture from "../components/login/Foto";
import style from "../themes/loginstyle.module.scss";

export const ContextVisitante = React.createContext<any>({
    name:'',setName:()=>{},
    email:'',setEmailCheck:()=>{},
    cpf:'',setCpfMascara:()=>{},
    photo:'',setPhoto:()=>{}
});

const Visitante:React.FC<loginProps> = (props) =>{
    const [name,setName] = useState<string>("");
    const [email,setEmail] = useState<string>("");
    const [cpf,setCpf] = useState<string>("");
    const [photo, setPhoto] = useState<string|null>(null);
    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidCPF,setIsValidCPF] = useState(false);

    const validadeCPF = (cpfString:string) =>{
         // Remove a máscara (pontos e traço)
        const cpf = cpfString.replace(/\D/g, "");

        // Verifica se tem 11 dígitos ou se todos os dígitos são iguais (ex: 111.111.111-11)
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false;
        }

        // Função para calcular o dígito verificador
        const calculateDigit = (cpfArray: number[], factor: number): number => {
            const sum = cpfArray.reduce((total, num, index) => total + num * (factor - index), 0);
            const remainder = (sum * 10) % 11;
            return remainder === 10 ? 0 : remainder;
        };

        // Converte a string em um array de números
        const cpfNumbers = cpf.split("").map(Number);

        // Calcula os dois dígitos verificadores
        const digit1 = calculateDigit(cpfNumbers.slice(0, 9), 10);
        const digit2 = calculateDigit(cpfNumbers.slice(0, 10), 11);

        // Verifica se os dígitos calculados são iguais aos informados no CPF
        return digit1 === cpfNumbers[9] && digit2 === cpfNumbers[10];
    }
    const setCpfMascara = (valor:string) => {
        let value = valor.replace(/\D/g, ""); // Remove tudo que não for número
        value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o primeiro ponto
        value = value.replace(/(\d{3})(\d)/, "$1.$2"); // Coloca o segundo ponto
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Coloca o traço
        setIsValidCPF(validadeCPF(value))
        setCpf(value); // Atualiza o estado com o CPF formatado
    };
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Valida o formato básico de email
        return emailRegex.test(email);
    };
    const setEmailCheck = (e: string) => {
        const value = e;
        setEmail(value);
        setIsValidEmail(validateEmail(value)); // Atualiza a validade do email
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(isValidEmail){
            if(isValidCPF){
                // Dados que serão enviados no POST
                const data = { name, email ,cpf, photo};
                    
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
            }else{
                alert("CPF Inválido");
            } 
        }else{
            alert("Email Inválido");
        }
        
      };
    return (
        <main className={style.visitante}>
            
            <form onSubmit={handleSubmit}>
            <ContextVisitante.Provider value= {{photo, setPhoto}}>
                <CameraCapture/>
            </ContextVisitante.Provider>
                <div >
                    <ContextVisitante.Provider value= {{name,setName}}>
                        <Input label = "Nome Completo" type = "text" name = "name" set="Name" title ="Nome Completo" placeholder="Digite seu nome..." required = {true} url = "visitante"/>
                    </ContextVisitante.Provider>
                    <ContextVisitante.Provider value= {{email,setEmailCheck}}>
                        <Input label = "Email" type = "text" name = "email" set="EmailCheck" title ="Email" placeholder="exemplo@dominio.com" required = {true} url = "visitante"/>
                    </ContextVisitante.Provider>
                    <ContextVisitante.Provider value= {{cpf,setCpfMascara}}>
                        <Input label = "CPF" type = "text" name = "cpf" set="CpfMascara" title ="CPF" placeholder="000.000.000-00" required = {true} url = "visitante" maxLength={14} value={cpf}/>
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