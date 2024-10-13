import React from "react";
import logo from "../assets/logo.png";

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = (className) => {
    return (
    <div className="flex place-content-center">
    <img className={`${className} w-14 mx-4`} src={logo} alt="" sizes="" />
    </div>
)}

export default Logo;