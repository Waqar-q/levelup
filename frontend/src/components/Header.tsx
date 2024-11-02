import React from "react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";
import { useLocation, useNavigate } from "react-router-dom";

const Header: React.FC = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const pathWithoutBackButton = [
        '/explore',
    ]
    const hideBackButton = pathWithoutBackButton.includes(location.pathname);

    return (
        <section className="header grid grid-cols-[20%_60%_20%] items-center justify-center h-16">
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
            <p className="text-2xl">Settings</p>
            </>)
            }
        </section>
    )
}

export default Header;