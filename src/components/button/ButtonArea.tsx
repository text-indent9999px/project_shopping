import React, { ReactNode, HTMLProps, MouseEvent } from 'react';
import './button.scss';

interface ButtonAreaProps extends HTMLProps<HTMLButtonElement> {
    children?: ReactNode;
    className?: string,
}

const ButtonArea: React.FC<ButtonAreaProps> = ({ children, className = ''}) => {
    return (
        <div className={`${className} custom-button-area`}>
            {children}
        </div>
    );
};

export default ButtonArea;