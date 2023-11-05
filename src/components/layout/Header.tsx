import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './header.scss';
import LogoBasic from '@/components/svg/LogoBasic';
import { useSelector, useDispatch } from 'react-redux';
import ScrollHandler from "@/components/event/ScrollHandler";
import {AppState} from "@/types/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/button/Button";
import BasketSidebar from "@/components/layout/BasketSidebar";
import {checkBasketSidebarOpen} from "@/actions/actions";


interface LayoutProps {
    children: React.ReactNode;
}

interface MenuItem {
    name: string;
    cate_no: number;
    parent_cate_no: number;
}

const menuData: MenuItem[] = [
    {
        name: 'BEST',
        cate_no: 10,
        parent_cate_no: 1,
    },
    {
        name: 'NEW',
        cate_no: 11,
        parent_cate_no: 1,
    },
    {
        name: 'PRODUCTS',
        cate_no: 12,
        parent_cate_no: 1,
    },
    {
        name: 'TREE',
        cate_no: 13,
        parent_cate_no: 12,
    },
    {
        name: 'FLOWER',
        cate_no: 14,
        parent_cate_no: 12,
    },
];


const Header: React.FC<LayoutProps> = ({ children }) => {


    // @ts-ignore
    const isScrolled = useSelector((state) => state.scroll.isScrolled);
    // @ts-ignore
    const isHeaderFixed = useSelector((state) => state.check_header.isHeaderFixed);
    // @ts-ignore
    const isHeaderColor = useSelector((state) => state.check_header.isHeaderColor);
    // @ts-ignore
    const basketProductData = useSelector((state) => state.product.basket);

    const [isHovered, setIsHovered] = useState<boolean>(false);
    const dispatch = useDispatch();

    function renderMenuItems(data: MenuItem[], parentCateNo: number, depth: number): JSX.Element | null {
        const menuItems = data.filter((item) => item.parent_cate_no === parentCateNo);
        if (menuItems.length === 0) return null;

        return (
            <ul className={`menu_${depth}ul`}>
                {menuItems.map((item) => {
                    const subMenu = renderMenuItems(data, item.cate_no, depth + 1);
                    return (
                        <li
                            key={item.cate_no}
                            className={`menu_${depth}li`}
                            data-cate={item.cate_no}
                            onMouseEnter={() => handleMenuEnter(item.cate_no)}
                            onMouseLeave={() => handleMenuLeave(item.cate_no)}
                        >
                            <Link href={`/product/list?cate_no=${item.cate_no}`}>{item.name}</Link>
                            {subMenu}
                        </li>
                    );
                })}
            </ul>
        );
    }

    function handleMenuEnter(cateNo: number) {
        setIsHovered(true);
        updateMenuState(cateNo, true);
    }

    function handleMenuLeave(cateNo: number) {
        if(cateNo !== 1){
            let chkData = menuData.filter((item) => item.cate_no === cateNo);
            if(chkData[0].parent_cate_no == 1){
                setIsHovered(false);
                updateMenuState(cateNo, false);
            }else{
                updateMenuState(cateNo, false);
            }
        }else{
            updateMenuState(cateNo, false);
        }
    }

    function updateMenuState(cateNo: number, isHover: boolean) {
        const gnbContainer = document.querySelector('.gnb-container');
        if(gnbContainer){
            const allLiElements = gnbContainer.querySelectorAll('li');
            let nextMenuHeight = 0;

            if(isHover){
                allLiElements.forEach((li) => {
                    const currentCateNo = parseInt(li.getAttribute('data-cate') || '');
                    const isAncestor = isCateAncestor(currentCateNo, cateNo);
                    if (isAncestor) {
                        li.classList.add('is-hover');
                        const directChildUl = li.querySelector(':scope > ul');
                        if (directChildUl) {
                            if (directChildUl instanceof Element && 'style' in directChildUl) {
                                if (directChildUl && directChildUl.querySelectorAll(':scope > li').length > 0) {
                                    const nextLiHeight = directChildUl.querySelectorAll(':scope > li')[0].scrollHeight;
                                    // @ts-ignore
                                    directChildUl.style.maxHeight = `${nextLiHeight}px`;
                                    nextMenuHeight = nextLiHeight;
                                }
                            }
                        }
                    } else {
                        li.classList.remove('is-hover');
                        const directChildUl = li.querySelector(':scope > ul');
                        if (directChildUl) {
                            if (directChildUl instanceof Element && 'style' in directChildUl) {
                                // @ts-ignore
                                directChildUl.style.maxHeight = '';
                                nextMenuHeight = 0;
                            }
                        }
                    }
                });
            }else{
                if(cateNo == 1){
                    setIsHovered(false);
                    allLiElements.forEach((li) => {
                        const directChildUl = li.querySelector(':scope > ul');
                        if (directChildUl instanceof Element && 'style' in directChildUl) {
                            if (directChildUl !== null) { // @ts-ignore
                                directChildUl.style.maxHeight = ``;
                            }
                        }
                    });
                }else{
                    let target = gnbContainer.querySelectorAll('[data-cate="'+ cateNo +'"]')[0];
                    target.classList.remove('is-hover');
                    // @ts-ignore
                    if(target.querySelectorAll(':scope > ul').length > 0) target.querySelectorAll(':scope > ul')[0].style.maxHeight = '';
                }
            }

            updateHeaderContainerHeight(nextMenuHeight);
        }
    }

    function isCateAncestor(ancestorCateNo: number, currentCateNo: number): boolean {
        return currentCateNo === ancestorCateNo || isAncestorOf(ancestorCateNo, currentCateNo);
    }

    function isAncestorOf(ancestorCateNo: number, currentCateNo: number): boolean {
        let chkData = function(cateNo:number, ancestorCateNo:number) {
            let data = menuData.find((item) => item.cate_no === cateNo);
            if (data) {
                if (data.cate_no === ancestorCateNo) {
                    return true; // 조상 카테고리인 경우 true 반환
                } else {
                    // 재귀 호출에서 반환 값을 반환
                    return chkData(data.parent_cate_no, ancestorCateNo);
                }
            }
            return false; // 조상 카테고리가 아닌 경우 false 반환
        };
        let result = chkData(currentCateNo, ancestorCateNo);
        return result;
    }

    function updateHeaderContainerHeight(nextMenuHeight:number) {
        const gnbContainer = document.querySelector('.gnb-container');
        const headerContainerBg = document.querySelector('.header-container-bg');
        if (headerContainerBg && gnbContainer) {
            // @ts-ignore
            headerContainerBg.style.height = `${gnbContainer.scrollHeight + nextMenuHeight}px`;
        }
    }

    return (
        <>
            <div className={`header-container${isHovered ? ' is-hover' : ''}${isScrolled ? ' is-scrolled' : ''}${isHeaderFixed ? ' is-fixed' : ''}`}
                 onMouseLeave={() => handleMenuLeave(1)}
                 data-color={`${isHeaderColor == 'bright' ? 'bright' : 'dark'}`}
            >
                <div className="logo-container">
                    <Link href={'/'}><LogoBasic width={60} /></Link>
                </div>
                <div className="gnb-container">
                    {renderMenuItems(menuData, 1, 1)}
                </div>
                <div className="util-container">
                    <Button className="cart" data-type={'icon'} width={'xl'} onClick={()=>dispatch(checkBasketSidebarOpen(true))}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span>
                            <i>{basketProductData.length}</i>
                        </span>
                    </Button>
                </div>
                <div className={`header-container-bg ${isHovered ? ' is-hover' : ''}`} />
                <BasketSidebar>.</BasketSidebar>
            </div>
            <ScrollHandler /> {/* 스크롤 이벤트 처리 컴포넌트 사용 */}
        </>

    );
};

export default Header;