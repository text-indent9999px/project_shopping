import React, { ReactNode, HTMLProps, MouseEvent, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import AlertPopup from "@/components/popup/alert";
import ConfirmPopup from "@/components/popup/confirm";
import './popup.scss';
import { createPortal } from 'react-dom';
import {RootState} from "@/types/types";
import {dimmedCloseFunction, dimmedCloseFunctionRemove, dimmedOpen, popupOpen} from "@/actions/actions";

interface PopupProps extends HTMLProps<HTMLButtonElement> {
}

const Popup: React.FC<PopupProps> = () => {

    const dispatch = useDispatch();
    const popupIsActive = useSelector((state:RootState) => state.popup.isActive);
    const dimmedIsActive = useSelector((state:RootState) => state.dimmed.isActive);
    const popupType = useSelector((state:RootState) => state.popup.type);
    const popupData = useSelector((state:RootState) => state.popup.popupData);

    useEffect(()=>{
        if(popupIsActive){
            const popupCloseEvent = () => {
                dispatch(popupOpen(false, 'alert', {
                    message: '',
                    contents: '',
                    okClick: function(){ console.log('ok') },
                    cancelClick: function(){ console.log('cancel') },
                }));
            }
            dispatch(dimmedCloseFunction(popupCloseEvent, 'popupClose'));
            if(! dimmedIsActive){
                dispatch(dimmedOpen(true));
            }
        }else{
            dispatch(dimmedCloseFunctionRemove('popupClose'));
        }
    },[popupIsActive])

    return createPortal(
        <>
            <div className={`custom-popup-container`}>
                {popupType == 'alert' && <AlertPopup></AlertPopup>}
                {popupType == 'confirm' && <ConfirmPopup></ConfirmPopup>}
            </div>
        </>,
        document.body
    );
};

export default Popup;