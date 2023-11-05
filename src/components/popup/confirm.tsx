import React, { ReactNode, HTMLProps, MouseEvent } from 'react';
import {useSelector} from "react-redux";
import Button from "@/components/button/Button";
import {checkBasketSidebarOpen} from "@/actions/actions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import ButtonArea from "@/components/button/ButtonArea";

interface PopupProps extends HTMLProps<HTMLButtonElement> {

}

const ConfirmPopup: React.FC<PopupProps> = ({ }) => {


    // @ts-ignore
    const popupData = useSelector((state) => state.popup.popupData);

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
                        <Button className={''} onClick={popupData.cancelClick} data-type={'textButton'} width={'md'} color={'color2'}>취소</Button>
                    </ButtonArea>
                </div>
            </div>
        </>
    );
};

export default ConfirmPopup;