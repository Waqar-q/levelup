import React from "react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

const Header: React.FC = () => {
    return (
        <section className="header grid grid-cols-[20%_60%_20%] items-center justify-center h-16">
            <Sidebar className="justify-self-start"/>
            <Logo className="justify-self-center"/>
            <ul className="justify-self-end mx-6">
                <li className="fas fa-search text-2xl"></li>
            </ul>
        </section>
    )
}

export default Header;