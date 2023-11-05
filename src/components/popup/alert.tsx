import React, { ReactNode, HTMLProps, MouseEvent } from 'react';

interface PopupProps extends HTMLProps<HTMLButtonElement> {
}

const AlertPopup: React.FC<PopupProps> = ({ }) => {
    return (
        <div className={`custom-popup-body custom-popup-alert`}>
            <div className="message">
                <p>끄아아아아악.</p>
            </div>
        </div>
    );
};

export default AlertPopup;