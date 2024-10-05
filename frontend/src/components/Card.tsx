import React from "react";

interface CardProps {
    imgsrc?: string;
    className?: string;
    title?:string;
    description?:string;
    buttonName?:string;

  }

const Card: React.FC<CardProps> = ({imgsrc, className = "", title, description, buttonName}) => {
    return (
        <div className={`${className} card p-6 shadow-md shadow-accent_light rounded-2xl flex flex-col items-center`}>
            <img className="rounded-lg" src={imgsrc} alt="" />
            <p className="title font-bold text-xl mt-2 self-start">{title}</p>
            <p className="description text-ellipsis line-clamp-3 my-4 leading-tight">{description}</p>
            <button className="btn w-1/2">{buttonName}</button>
        </div>
    )
}

export default Card;