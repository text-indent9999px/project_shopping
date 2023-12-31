import React, { ReactNode, HTMLProps, MouseEvent } from 'react';
import {useSelector} from "react-redux";
import Button from "@/components/button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import ButtonArea from "@/components/button/ButtonArea";
import {RootState} from "@/types/types";

interface PopupProps extends HTMLProps<HTMLButtonElement> {
}

const AlertPopup: React.FC<PopupProps> = ({ }) => {

    const popupData = useSelector((state:RootState) => state.popup.popupData);

    return (
        <>
            <div className="custom-popup-header">
                <h4>확인</h4>
                <Button className={'close'} width={'sm'} data-type={'icon'} onClick={popupData.cancelClick}>
                    <FontAwesomeIcon icon={faClose} />
                </Button>
            </div>
            <div className={`custom-popup-body custom-popup-confirm`}>
                <div className="custom-popup-message">
                    <p>{popupData.message}</p>
                </div>
                <div className="custom-popup-actions">
                    <ButtonArea className={''}>
                        <Button className={''} onClick={popupData.okClick} data-type={'textButton'} width={'md'} color={'color1'}>확인</Button>
                    </ButtonArea>
                </div>
            </div>
        </>
    );
};

export default AlertPopup;