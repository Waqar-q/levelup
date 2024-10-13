import React, { useRef, useState } from "react";

interface DialogProps{
    className?: string;
    children?: React.ReactNode;
    openClassName?:string;
    openButtonText?: string;
    closeClassName?:string;
    closeButtonText?: string;

}

const Dialog: React.FC<DialogProps> = ({className, children, openClassName, closeClassName, openButtonText = "Open", closeButtonText = "Close"}) => {

    const [isOpen, setOpen] = useState(false);

    const toggleDialog = () => {
        setOpen(!isOpen);        
    }

    return (
        <div className="dialog-wrapper">
            <button onClick={toggleDialog} className={`${openClassName}`}>{openButtonText}</button>
            <div className={`${className} dialog-bg ${isOpen?"open":"close"} absolute inset-0 h-full w-full`}>
                <div className="dialog flex flex-col justify-center p-6 bg-light shadow-md shadow-accent_light relative 
                left-[50%] top-[40%] -translate-x-[50%] -translate-y-[50%] rounded-2xl w-2/3 max-w-96">
                    {children}
                    <button className={`${closeClassName}`} onClick={toggleDialog}>{closeButtonText}</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog;