import React from "react";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

const Header: React.FC = () => {
    return (
        <section className="header grid grid-cols-[30%_40%_30%] items-center justify-evenly h-16">
            <Sidebar/>
            <Logo/>
            <ul>
                <li className="fas fa-search">Yes</li>
            </ul>
        </section>
    )
}

export default Header;