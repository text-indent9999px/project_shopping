import React, { ReactNode, HTMLProps, MouseEvent } from 'react';
import './button.scss';

interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    children: ReactNode; // 버튼 내용
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className: string,
    width: string,
    type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className = '', ...rest }) => {
    return (
        <button type="button" className={`${className} custom-button`} onClick={onClick} {...rest}>
            {children}
        </button>
    );
};

export default Button;