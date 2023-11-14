import React from 'react';
import './BasketSidebar.scss';
import Product2 from "@/components/product/Product2";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/types/types";
import Button from "@/components/button/Button";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {checkBasketSidebarOpen, deleteAllToBasketData} from "@/actions/actions";
import {deleteAllToCart} from "@/function/Common";
import ButtonArea from "@/components/button/ButtonArea";
import InputBox from "@/components/input/InputBox";
import BasketControl from "@/components/basket/BasketControl";

interface LayoutProps {
    children?: React.ReactNode;
}

const BasketSidebar: React.FC<LayoutProps> = ({ children }) => {

    const productData = useSelector((state:RootState) => state.product.basket);
    const isBasketSidebarOpen = useSelector((state:RootState) => state.check_header.isBaksetSidebarOpen);

    const dispatch = useDispatch();

    return (
        <>
            <div className={`basket-sidebar-container ${isBasketSidebarOpen ? 'is-open' : 'is-closed'}`}>
                <div className="basket-sidebar-wrapper">
                    <div className="basket-sidebar-header">
                        <Button className={'close'} width={'sm'} data-type={'icon'} onClick={()=>dispatch(checkBasketSidebarOpen(false))}>
                            <FontAwesomeIcon icon={faClose} />
                        </Button>
                    </div>
                    {/*<div className="baket-sidebar-actions">*/}
                    {/*    <InputBox type={"checkbox"}></InputBox>*/}
                    {/*    <ButtonArea>*/}
                    {/*        <Button className={'empty'} width={'sm'} data-type={'textButton'} color={'color2'} onClick={deleteAllToCart} data-disabled={`${productData.length >= 1 ? '' : 'disabled'}`}>*/}
                    {/*            선택 상품 삭제*/}
                    {/*        </Button>*/}
                    {/*        <Button className={'empty'} width={'sm'} data-type={'textButton'} color={'color2'} onClick={deleteAllToCart} data-disabled={`${productData.length >= 1 ? '' : 'disabled'}`}>*/}
                    {/*            장바구니 비우기*/}
                    {/*        </Button>*/}
                    {/*    </ButtonArea>*/}
                    {/*</div>*/}
                    {/*<div className="basket-sidebar-products">*/}
                    {/*    {productData.length > 0 && <Product2 data={productData} grid={1} output={3} page={1} pageSet={5} moreview={true} moreviewtype={'pagination'}/>}*/}
                    {/*    {productData.length == 0 && <div className={`custom-empty-message`}>장바구니에 담긴 상품이 없습니다.</div>}*/}
                    {/*</div>*/}
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
        </>

    );
};

export default BasketSidebar;