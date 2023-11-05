import React, { useState, useEffect } from 'react';
import './BasketSidebar.scss';
import Product2 from "@/components/product/Product2";
import {useDispatch, useSelector} from "react-redux";
import {ProductData} from "@/types/types";
import Button from "@/components/button/Button";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {checkBasketSidebarOpen, deleteAllToBasketData} from "@/actions/actions";
import {deleteAllToCart} from "@/function/Common";


interface LayoutProps {
    children: React.ReactNode;
}

const BasketSidebar: React.FC<LayoutProps> = ({ children }) => {

    // @ts-ignore
    const productData = useSelector((state) => state.product.basket);
    // @ts-ignore
    const isBasketSidebarOpen = useSelector((state) => state.check_header.isBaksetSidebarOpen);




    const dispatch = useDispatch();

    const handleDelete = () => {
        //dispatch(deleteAllToBasketData());
        deleteAllToCart();
    };

    return (
        <>
            <div className={`basket-sidebar-container ${isBasketSidebarOpen ? 'is-open' : 'is-closed'}`}>
                <div className="basket-sidebar-wrapper">
                    <div className="baket-sidebar-header">
                        <Button className={'close'} width={'sm'} data-type={'icon'} onClick={()=>dispatch(checkBasketSidebarOpen(false))}>
                            <FontAwesomeIcon icon={faClose} />
                        </Button>
                    </div>
                    <div className="baket-sidebar-actions">
                        <Button className={'empty'} width={'sm'} data-type={'textButton'} color={'color2'} onClick={handleDelete} data-disabled={`${productData.length >= 1 ? '' : 'disabled'}`}>
                            장바구니 비우기
                        </Button>
                    </div>
                    <div className="basket-sidebar-products">
                        {productData.length > 0 && <Product2 data={productData} grid={1} output={3} page={1} pageSet={5} moreview={true} moreviewtype={'pagination'}/>}
                        {productData.length == 0 && <div className={`custom-empty-message`}>장바구니에 담긴 상품이 없습니다.</div>}
                    </div>
                    <div className="basket-sidebar-footer">
                        <Button className={'move'} width={'sm'} data-type={'textButton'} color={'color2'}>
                            <Link href={'/basket'}>장바구니로 이동</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </>

    );
};

export default BasketSidebar;