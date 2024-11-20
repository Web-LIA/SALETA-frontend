import { useContext, useState } from "react";
import { IoMdEye,IoIosEyeOff } from "react-icons/io";
import style from "./input.module.scss";
import { Context } from "../Login";
interface inputProps{
    label:string;
    type:'text'|"number"|"password";
    name:string;
    set:string;
    url:string;
    required?:boolean;
    title?:string;
    placeholder?:string;
}
const Input:React.FC<inputProps> = ({label,type,name,title,placeholder,set,required,url}) =>{
    const [revelar,setRevelar] = useState<boolean>(false)
    const context = useContext(Context);
    

    return (
    <div>
        <label htmlFor={name}>{label}</label>
        {type == "password" ? (
            <div className={style.eye} >
                {revelar ?
                
                (
                    <>
                        <input type="text" title={title} placeholder={placeholder} name={name} id = {name} onChange={e=>{context[`set${set}`](e.target.value)}} required = {required}/>
                        <button onClick={() => {setRevelar(false)}} title="eye open" type="button"><IoMdEye/></button>
                    </>
                ):(
                    <>
                        <input type="password" title={title} placeholder={placeholder} name={name} id = {name} onChange={e=>{context[`set${set}`](e.target.value)}} required = {required}/>
                        <button onClick={() => {setRevelar(true)} }title="eye close" type="button"><IoIosEyeOff/></button>
                    </>
                )}
                
            </div>
        ):(
            <input type={type} title={title} placeholder={placeholder} name={name} id = {name} onChange={e=>{context[`set${name}`](e.target.value)}} required = {required}/>
        )}
    </div>
    )
}
export default Input;