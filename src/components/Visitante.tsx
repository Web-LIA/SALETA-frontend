import loginProps from "./login/loginProps";
import Input from "./login/components/Input";
import { useState } from "react";

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
            <
        </main>
    )
}
export default Visitante;