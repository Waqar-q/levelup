import React from "react";
import { Link } from "react-router-dom";

const BottomMenu: React.FC = () => {
    return (
        <section className="bottom-menu bg-light w-full bottom-0 left-0 border-t border-accent_light absolute">
            <ul className="flex justify-between max-w-full w-full">
            <li key="notifications" className="px-2 py-5 hover:text-secondary_light text-2xl font-semibold">
                <a href="#notifications"><i className="material-icons-outlined px-4 text-3xl">notifications</i></a>
            </li>
            <li key="profile" className="px-2 py-5 hover:text-secondary_light text-2xl font-semibold">
                <Link to="/profile"><i className="material-icons-outlined px-4 text-3xl">person</i></Link>
            </li>
            <li key="explore" className="px-2 py-5 hover:text-secondary_light text-2xl font-semibold">
                <a href="#explore"><i className="material-icons-outlined px-4 text-3xl">public</i></a>
            </li>
            <li key="my-courses" className="px-2 py-5 hover:text-secondary_light text-2xl font-semibold">
                <a href="#my-courses"><i className="material-icons-outlined px-4 text-3xl">book</i></a>
            </li>
            <li key="settings" className="px-2 py-5 hover:text-secondary_light text-2xl font-semibold">
            <Link to="/settings"><i className="material-icons-outlined px-4 text-3xl">settings</i></Link>
            </li>
            </ul>
        </section>
    )
}

export default BottomMenu;