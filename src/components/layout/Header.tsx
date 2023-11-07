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

import {get, ref} from "firebase/database";


interface LayoutProps {
    children: React.ReactNode;
}

interface MenuItem {
    name: string;
    menu_no: number;
    parent_menu_no: number;
    href: string,
}


const Header: React.FC<LayoutProps> = ({ children }) => {

    const [menuList, setMenuList] = useState([]);

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

    function renderMenuItems(data: MenuItem[], parentmenuNo: number, depth: number): JSX.Element | null {
        const menuItems = data.filter((item) => item.parent_menu_no === parentmenuNo);
        if (menuItems.length === 0) return null;

        return (
            <ul className={`menu_${depth}ul`}>
                {menuItems.map((item) => {
                    const subMenu = renderMenuItems(data, item.menu_no, depth + 1);
                    return (
                        <li
                            key={item.menu_no}
                            className={`menu_${depth}li`}
                            data-menu={item.menu_no}
                            onMouseEnter={() => handleMenuEnter(item.menu_no)}
                            onMouseLeave={() => handleMenuLeave(item.menu_no)}
                        >
                            <Link href={`${item.href}`}>{item.name}</Link>
                            {subMenu}
                        </li>
                    );
                })}
            </ul>
        );
    }

    function handleMenuEnter(menuNo: number) {
        setIsHovered(true);
        updateMenuState(menuNo, true);
    }

    function handleMenuLeave(menuNo: number) {
        if(menuNo !== 1){
            let chkData = menuList.filter((item) => item.menu_no === menuNo);
            if(chkData[0].parent_menu_no == 1){
                setIsHovered(false);
                updateMenuState(menuNo, false);
            }else{
                updateMenuState(menuNo, false);
            }
        }else{
            updateMenuState(menuNo, false);
        }
    }

    function updateMenuState(menuNo: number, isHover: boolean) {
        const gnbContainer = document.querySelector('.gnb-container');
        if(gnbContainer){
            const allLiElements = gnbContainer.querySelectorAll('li');
            let nextMenuHeight = 0;

            if(isHover){
                allLiElements.forEach((li) => {
                    const currentmenuNo = parseInt(li.getAttribute('data-menu') || '');
                    const isAncestor = ismenuAncestor(currentmenuNo, menuNo);
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
                if(menuNo == 1){
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
                    let target = gnbContainer.querySelectorAll('[data-menu="'+ menuNo +'"]')[0];
                    target.classList.remove('is-hover');
                    // @ts-ignore
                    if(target.querySelectorAll(':scope > ul').length > 0) target.querySelectorAll(':scope > ul')[0].style.maxHeight = '';
                }
            }

            updateHeaderContainerHeight(nextMenuHeight);
        }
    }

    function ismenuAncestor(ancestormenuNo: number, currentmenuNo: number): boolean {
        return currentmenuNo === ancestormenuNo || isAncestorOf(ancestormenuNo, currentmenuNo);
    }

    function isAncestorOf(ancestormenuNo: number, currentmenuNo: number): boolean {
        let chkData = function(menuNo:number, ancestormenuNo:number) {
            let data = menuList.find((item) => item.menu_no === menuNo);
            if (data) {
                if (data.menu_no === ancestormenuNo) {
                    return true; // 조상 카테고리인 경우 true 반환
                } else {
                    // 재귀 호출에서 반환 값을 반환
                    return chkData(data.parent_menu_no, ancestormenuNo);
                }
            }
            return false; // 조상 카테고리가 아닌 경우 false 반환
        };
        let result = chkData(currentmenuNo, ancestormenuNo);
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

    // @ts-ignore
    const database = useSelector((state) => state.firebase.database);
    //'menu_list' 경로에 대한 참조 생성
    const menuListRef = ref(database, 'menu_list');

    get(menuListRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setMenuList(Object.values(data));
            } else {
                console.log('No data available');
            }
        })
        .catch((error) => {
            console.error('Error reading data from the database:', error);
        });

    // Firebase에서 데이터를 가져온 후에 renderMenuItems 함수 호출
    useEffect(() => {
        // menuList 상태가 업데이트될 때 renderMenuItems 함수 호출
        renderMenuItems(menuList, 1, 1);
    }, [menuList]);



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
                    {renderMenuItems(menuList, 1, 1)}
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