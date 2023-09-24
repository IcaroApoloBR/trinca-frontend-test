import React, { ReactNode, MouseEventHandler } from 'react';

interface ButtonProps {
    type: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    children: ReactNode;
}

export const Button = ({ type, onClick, children }: ButtonProps) => {
    return (
        <>
            <button type={type} onClick={onClick} className="relative px-5 py-2.5 bg-black text-white text-lg font-bold rounded-2xl shadow-lg hover:scale-95 hover:bg-opacity-70 transition-all">
                {children}
            </button>
        </>
    )
}