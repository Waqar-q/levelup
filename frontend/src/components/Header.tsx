import React from "react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

interface HeaderProps{
    page?:string,
    className?:string,
    options?: {
        name: string;
        link: string;
    }[],
}



const Header: React.FC<HeaderProps> = ({className="",page, options}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const pathWithoutBackButton = [
        '/explore',
    ]
    const hideBackButton = pathWithoutBackButton.includes(location.pathname);
    const [optionsOpen, setOptionsOpen] = useState(false);

    return (
        <header className={`header ${className} grid grid-cols-[20%_60%_20%] fixed right-0 left-0 items-center justify-center h-16 border-b bg-light border-gray-200`}>
            { hideBackButton ?( 
                <>
            <Sidebar className="justify-self-start"/>
            <Logo className="justify-self-center"/>
            <ul className="justify-self-end mx-6">
            <li className="fas fa-search text-2xl"></li>
            </ul>
            </>
             ) : (
            <>
            <a onClick={() => navigate(-1)}><i className="material-icons px-5 text-3xl">arrow_back</i></a>
            <p className="text-2xl">{page}</p>
            {options && (
                <div className="justify-self-center">
                <button onClick={() => setOptionsOpen(!optionsOpen)} className="bg-none p-0 m-0 rounded-none border-none"><i className="material-icons text-3xl">more_vert</i></button>
                <span className={`absolute rounded-md bg-light top-12 right-4 py-4 ${optionsOpen ? '':'hidden'}`}>
                    <ul>
                        {options.map((option) =>(
                            <li className="px-4 text-dark text-lg py-1 border-b border-gray-200" key={option.name}>
                                <Link to={option.link}>{option.name}</Link>
                            </li>
                        ))}
                    </ul>
                </span>
                </div>
                )}
            </>)
            }
        </header>
    )
}

export default Header;