import React from 'react';
import './MenuSidebar.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/types/types";
import Button from "@/components/button/Button";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ScrollBar from "@/components/scroll/ScrollBar";
import {checkMenuSidebarOpen} from "@/actions/actions";

interface LayoutProps {
    children?: React.ReactNode;
}

const MenuSidebar: React.FC<LayoutProps> = ({ children }) => {

    const isMenuSidebarOpen = useSelector((state:RootState) => state.check_header.isMenuSidebarOpen);
    const dispatch = useDispatch();

    return (
        <>
            <div className={`menu-sidebar-container ${isMenuSidebarOpen ? 'is-open' : 'is-closed'}`}>
                <div className="menu-sidebar-wrapper">
                    <div className="menu-sidebar-header">
                        <Button className={'close'} width={'sm'} data-type={'icon'} onClick={()=> dispatch(checkMenuSidebarOpen(false))}>
                            <FontAwesomeIcon icon={faClose} />
                        </Button>
                    </div>
                    <div className={"menu-sidebar-contents"}>
                        <ScrollBar>
                            {children}
                        </ScrollBar>
                    </div>
                    <div className="menu-sidebar-footer">
                        {/*<ButtonArea>*/}
                        {/*    <Link href={'/order/basket'}>*/}
                        {/*        <Button className={'move'} width={'sm'} data-type={'textButton'} color={'color2'}>*/}
                        {/*            장바구니로 이동*/}
                        {/*        </Button>*/}
                        {/*    </Link>*/}
                        {/*    <Link href={'/order/orderform'}>*/}
                        {/*        <Button className={'move'} width={'sm'} data-type={'textButton'} color={'color2'}>*/}
                        {/*            선택 상품 주문*/}
                        {/*        </Button>*/}
                        {/*    </Link>*/}
                        {/*</ButtonArea>*/}
                    </div>
                </div>
            </div>
        </>

    );
};

export default MenuSidebar;