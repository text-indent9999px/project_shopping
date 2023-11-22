import React, {useEffect} from 'react';
import './BasketSidebar.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/types/types";
import Button from "@/components/button/Button";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {
    checkBasketSidebarOpen,
    dimmedCloseFunction, dimmedCloseFunctionRemove, dimmedOpen
} from "@/actions/actions";
import {disableScroll, enableScroll} from "@/function/Common";
import ButtonArea from "@/components/button/ButtonArea";
import BasketControl from "@/components/basket/BasketControl";
import { createPortal } from 'react-dom';

interface LayoutProps {
    children?: React.ReactNode;
}

const BasketSidebar: React.FC<LayoutProps> = ({ children }) => {

    const isBasketSidebarOpen = useSelector((state:RootState) => state.check_header.isBaksetSidebarOpen);
    const dispatch = useDispatch();
    const dimmedIsActive = useSelector((state:RootState) => state.dimmed.isActive);

    useEffect(()=>{
        if(isBasketSidebarOpen){
            disableScroll();
            const basketSidebarCloseEvent = () => {
                dispatch(checkBasketSidebarOpen(false));
                enableScroll();
            }
            dispatch(dimmedCloseFunction(basketSidebarCloseEvent, 'basketSidebarClose'));
            if(! dimmedIsActive){
                dispatch(dimmedOpen(true));
            }
        }else{
            dispatch(dimmedCloseFunctionRemove('basketSidebarClose'));
            enableScroll();
            dispatch(dimmedOpen(false));
        }
    },[isBasketSidebarOpen]);

    return createPortal(
        <>
            <div className={`basket-sidebar-container ${isBasketSidebarOpen ? 'is-open' : 'is-closed'}`}>
                <div className="basket-sidebar-wrapper">
                    <div className="basket-sidebar-header">
                        <Button className={'close'} width={'sm'} data-type={'icon'} onClick={()=>dispatch(checkBasketSidebarOpen(false))}>
                            <FontAwesomeIcon icon={faClose} />
                        </Button>
                    </div>
                    <BasketControl grid={1} output={999} moreview={false}></BasketControl>
                    <div className="basket-sidebar-footer">
                        <ButtonArea>
                            <Link href={'/order/basket'}>
                                <Button className={'move'} width={'sm'} data-type={'textButton'} color={'color2'}>
                                    장바구니로 이동
                                </Button>
                            </Link>
                            <Link href={'/order/orderform'}>
                                <Button className={'move'} width={'sm'} data-type={'textButton'} color={'color2'}>
                                    선택 상품 주문
                                </Button>
                            </Link>
                        </ButtonArea>

                    </div>
                </div>
            </div>
        </>,
        document.body
    );
};

export default BasketSidebar;