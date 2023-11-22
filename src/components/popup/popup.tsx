import React, {ReactNode, HTMLProps, MouseEvent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import AlertPopup from "@/components/popup/alert";
import ConfirmPopup from "@/components/popup/confirm";
import './popup.scss';
import { createPortal } from 'react-dom';
import {RootState} from "@/types/types";
import {dimmedCloseFunction, dimmedCloseFunctionRemove, dimmedOpen, popupOpen} from "@/actions/actions";
import {enableScroll} from "@/function/Common";
import store from "@/store/store";

interface PopupProps extends HTMLProps<HTMLButtonElement> {
}

const Popup: React.FC<PopupProps> = () => {

    const dispatch = useDispatch();
    const popupIsActive = useSelector((state:RootState) => state.popup.isActive);
    const dimmedIsActive = useSelector((state:RootState) => state.dimmed.isActive);
    const popupType = useSelector((state:RootState) => state.popup.type);
    const [dimmedBeforeActive, setDimmedBeforeActive] = useState(false);

    useEffect(()=>{
        if(popupIsActive){
            const popupCloseEvent = () => {
                store.dispatch(popupOpen(false));
            }
            dispatch(dimmedCloseFunction(popupCloseEvent, 'popupClose'));
            if(! dimmedIsActive){
                dispatch(dimmedOpen(true));
                setDimmedBeforeActive(false);
            }else{
                setDimmedBeforeActive(true);
            }
        }else{
            dispatch(dimmedCloseFunctionRemove('popupClose'));
            if(! dimmedBeforeActive){
                dispatch(dimmedOpen(false));
            }
        }
    },[popupIsActive])


    return createPortal(
        <>
            {popupIsActive && <div className={`custom-popup-container`}>
                {popupType == 'alert' && <AlertPopup></AlertPopup>}
                {popupType == 'confirm' && <ConfirmPopup></ConfirmPopup>}
            </div>}
        </>,
        document.body
    );
};

export default Popup;