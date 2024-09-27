import React from "react";

interface ButtonProps {
    value: string;
    className?: string;
  }

const Button: React.FC<ButtonProps> = ({value, className = ""}) => {
    return (
        <button className={`${className} btn font-sans bg-secondary px-6 py-3 rounded-full text-light font-semibold border-primary border`}>
            {value}
        </button>
    )
}

export default Button;