import React from "react";

interface ButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
    disabled?: boolean;
    className?: string;
}

const Button = ({ onClick, disabled, children, className }: ButtonProps) => {
    return (
        <button
            aria-pressed="true"
            type="button"
            disabled={disabled}
            className={`cursor-pointer  disabled:text-gray-400 disabled:pointer-events-none  focus:border  hover:bg-gray-700 transition-all duration-500 rounded-xl active:bg-black active:text-white ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
