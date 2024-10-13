import React from "react";

interface InputProps{
    className?: string;
    fieldType: string;
    placeholder?:string;
}

const Input: React.FC<InputProps> = ({className, fieldType, placeholder}) => {
    return (
        <div>
            <input 
            type={fieldType} 
            className=
            {`${className} 
                ${(fieldType == "button" || fieldType == "submit")?"btn":""}
                
            `} 
            placeholder={placeholder}/>
        </div>
    )
}

export default Input;