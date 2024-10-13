import React from "react";

interface RadioProps {
    value?: string;
    className?: string;
  }

const Radio: React.FC<RadioProps> = ({value, className = ""}) => {

    

    return (
        <label className={`${className} radio flex items-center p-5 rounded-xl`}>
        <input className="mr-4 scale-150 w-min" type="radio" name={value}>
        </input>
        <span>{value}</span>
        </label>
    )
}

export default Radio;