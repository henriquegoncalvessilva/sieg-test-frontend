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
            className={`cursor-pointer ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
