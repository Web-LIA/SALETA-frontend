interface inputProps{
    label:string;
    type:'text'|"number";
    name:string;
    title?:string;
    placeholder?:string;
}
const Input:React.FC<inputProps> = ({label,type,name,title,placeholder}) =>{
    return (
    <div>
        <label htmlFor={name}>{label}</label>
        <input type={type} title={title} placeholder={placeholder} name={name} id = {name}/>
    </div>
    )
}
export default Input;