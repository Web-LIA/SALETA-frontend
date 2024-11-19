import { useState } from "react";
import { IoMdEye,IoIosEyeOff } from "react-icons/io";
import style from "./input.module.scss"
interface inputProps{
    label:string;
    type:'text'|"number"|"password";
    name:string;
    title?:string;
    placeholder?:string;
}
const Input:React.FC<inputProps> = ({label,type,name,title,placeholder}) =>{
    const [revelar,setRevelar] = useState<boolean>(false)

    

    return (
    <div>
        <label htmlFor={name}>{label}</label>
        {type == "password" ? (
            <div className={style.eye} >
                {revelar ?
                
                (
                    <>
                        <input type="text" title={title} placeholder={placeholder} name={name} id = {name}/>
                        <button onClick={() => {setRevelar(false)}} title="eye open"><IoMdEye/></button>
                    </>
                ):(
                    <>
                        <input type="password" title={title} placeholder={placeholder} name={name} id = {name}/>
                        <button onClick={() => {setRevelar(true)} }title="eye close"><IoIosEyeOff/></button>
                    </>
                )}
                
            </div>
        ):(
            <input type={type} title={title} placeholder={placeholder} name={name} id = {name}/>
        )}
    </div>
    )
}
export default Input;