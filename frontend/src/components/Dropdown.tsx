import React, { useState } from "react";

interface DropdownProps{
    className?: string;
    options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({className,options}) => {

    const [selected, setSelected] = useState('');

    const handleDropdownChange = (value: string) => {
        setSelected(value);
    }

    return (
        <select className={`${className} dropdown p-4 bg-sky-200 rounded-xl w-full max-w-96`} onChange={(e) => handleDropdownChange(e.target.value)}>
            {options.map((element) => (
                <option key={element}>{element}</option>
            ))}
        </select>
    )
}

export default Dropdown;