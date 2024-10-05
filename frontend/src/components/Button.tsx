import React from "react";

interface ButtonProps {
    value: string;
    className?: string;
  }

const Button: React.FC<ButtonProps> = ({value, className = ""}) => {
    return (
        <button className={`${className} btn`}>
            {value}
        </button>
    )
}

export default Button;