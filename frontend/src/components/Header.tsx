import React from "react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps{
    page?:string}



const Header: React.FC<HeaderProps> = ({page}) => {

    const location = useLocation();
    const navigate = useNavigate();
    const pathWithoutBackButton = [
        '/explore',
    ]
    const hideBackButton = pathWithoutBackButton.includes(location.pathname);

    return (
        <header className="header grid grid-cols-[20%_60%_20%] fixed right-0 left-0 items-center justify-center h-16 border-b bg-light border-gray-200">
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
            <div></div>
            </>)
            }
        </header>
    )
}

export default Header;