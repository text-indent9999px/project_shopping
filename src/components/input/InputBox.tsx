import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import './input.scss';

interface InputBoxProps {
    type?: 'checkbox' | 'radio',
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string,
    checked?: boolean,
    children?: React.ReactNode,
    disabled?: boolean
}

const InputBox: React.FC<InputBoxProps> = ({ children, className = '', type = 'checkbox', onChange, checked = false, ...rest}) => {

    let inputId = uuidv4();

    return (
        <div className={`${className} custom-input-box`}>
            <input type={type} id={`input-${inputId}`} onChange={onChange} checked={checked} {...rest} />
            <label htmlFor={`input-${inputId}`} ></label>
            {children}
        </div>
    );
};

export default InputBox;