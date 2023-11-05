import React, { ReactNode, HTMLProps, MouseEvent } from 'react';
import {useSelector} from "react-redux";
import AlertPopup from "@/components/popup/alert";
import ConfirmPopup from "@/components/popup/confirm";
import './popup.scss';

interface PopupProps extends HTMLProps<HTMLButtonElement> {
}

const Popup: React.FC<PopupProps> = () => {

    // @ts-ignore
    const popupType = useSelector((state) => state.popup.type);

    return (
        <div className={`custom-popup-container`}>
            {popupType == 'alert' && <AlertPopup>.</AlertPopup>}
            {popupType == 'confirm' && <ConfirmPopup>.</ConfirmPopup>}
        </div>
    );
};

export default Popup;