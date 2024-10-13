import React from "react";

interface CheckProps {
    value?: string;
    className?: string;
  }

const Checkbox: React.FC<CheckProps> = ({value, className = ""}) => {

    

    return (
        <label className={`${className} checkbox flex items-center p-5 rounded-xl`}>
        <input className="mr-4 scale-150" type="checkbox" name={value}>
        </input>
        <span>{value}</span>
        </label>
    )
}

export default Checkbox;