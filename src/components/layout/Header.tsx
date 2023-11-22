import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './Header.scss';
import LogoBasic from '@/components/svg/LogoBasic';
import { useSelector, useDispatch } from 'react-redux';
import {RootState} from "@/types/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartShopping, faBars} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/button/Button";
import BasketSidebar from "@/components/layout/BasketSidebar";
import {checkBasketSidebarOpen, checkHeaderFixed, checkMenuSidebarOpen} from "@/actions/actions";
import {DatabaseReference, ref} from "firebase/database";
import { onValue } from "firebase/database";
import MenuSidebar from "@/components/layout/MenuSidebar";

interface LayoutProps {
    children?: React.ReactNode;
    currentMenu?: string,
    check?: number,
    loading: boolean,
}

interface MenuItem {
    name: string;
    menu_no: number;
    parent_menu_no: number;
    href: string,
}


const Header: React.FC<LayoutProps> = ({ children, currentMenu, check, loading }) => {

    const [menuList, setMenuList] = useState([]);
    const deviceCheck = useSelector((state:RootState) => state.browser.device);
    const isScrolled = useSelector((state:RootState) => state.scroll.isScrolled);
    const isHeaderFixed = useSelector((state:RootState) => state.check_header.isHeaderFixed);
    const isHeaderColor = useSelector((state:RootState) => state.check_header.isHeaderColor);
    const basketProductData = useSelector((state:RootState) => state.product.basket);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState<Record<string, boolean>>({});
    const dispatch = useDispatch();
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        let newClickData = {} as Record<string, boolean>;
        Object.keys(isClicked).forEach(function(item){
            newClickData[item] = false;
        })
        setIsClicked(newClickData);
    }, [check]);

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
                            className={`menu_${depth}li ${deviceCheck !== 'PC' && isClicked[item.menu_no] ? 'is-clicked' : ''} ${subMenu ? 'is-submenu' : ''}`}
                            data-menu={item.menu_no}
                            onMouseEnter={() => deviceCheck == 'PC' && handleMenuEnter(item.menu_no)}
                            onMouseLeave={() => deviceCheck == 'PC' && handleMenuLeave(item.menu_no)}
                            onClick={()=> deviceCheck !== 'PC' && handleMenuClick(item.menu_no)}
                        >
                            <Link href={deviceCheck == 'PC' ? `${item.href}` : (subMenu ? '#' : `${item.href}`)}
                                  onClick={(e) => (deviceCheck !== 'PC' && subMenu) && e.preventDefault()}>
                                {item.name}
                            </Link>
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

    function handleMenuClick(menuNo: number):void{
        let testMenu = {...isClicked};
        testMenu[String(menuNo)] = ! testMenu[String(menuNo)];
        setIsClicked(testMenu);
    }

    function handleMenuLeave(menuNo: number) {
        if(menuNo !== 1){
            let chkData:MenuItem[] = menuList.filter((item:MenuItem) => item.menu_no === menuNo);
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
                        const directChildUl = li.querySelector(':scope > ul') as HTMLElement;
                        if (directChildUl) {
                            if (directChildUl instanceof Element && 'style' in directChildUl) {
                                if (directChildUl && directChildUl.querySelectorAll(':scope > li').length > 0) {
                                    const nextLiHeight = directChildUl.querySelectorAll(':scope > li')[0].scrollHeight;
                                    directChildUl.style.maxHeight = `${nextLiHeight}px`;
                                    nextMenuHeight = nextLiHeight;
                                }
                            }
                        }
                    } else {
                        li.classList.remove('is-hover');
                        const directChildUl = li.querySelector(':scope > ul') as HTMLElement;
                        if (directChildUl) {
                            if (directChildUl instanceof Element && 'style' in directChildUl) {
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
                        const directChildUl = li.querySelector(':scope > ul') as HTMLElement;
                        if (directChildUl instanceof Element && 'style' in directChildUl) {
                            if (directChildUl !== null) {
                                directChildUl.style.maxHeight = ``;
                            }
                        }
                    });
                }else{
                    let target = gnbContainer.querySelectorAll('[data-menu="'+ menuNo +'"]')[0] as HTMLElement;
                    let target2 = target.querySelectorAll(':scope > ul')[0] as HTMLElement;
                    target.classList.remove('is-hover');
                    if(target.querySelectorAll(':scope > ul').length > 0) target2.style.maxHeight = '';
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
            let data:any = menuList.find((item:MenuItem) => item.menu_no === menuNo);
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
        const gnbContainer = document.querySelector('.gnb-container') as HTMLElement;
        const headerContainerBg = document.querySelector('.header-container-bg') as HTMLElement;
        if (headerContainerBg && gnbContainer) {
            headerContainerBg.style.height = `${gnbContainer.scrollHeight + nextMenuHeight}px`;
        }
    }

    const database = useSelector((state:RootState) => state.firebase.database);
    const menuListRef:DatabaseReference = ref(database, 'menu_list');

    useEffect(() => {
        onValue(menuListRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setMenuList(Object.values(data));
                let clickData = {} as Record<string, boolean>;
                Object.keys(data).forEach(function(item){
                    clickData[item] = false;
                })
                setIsClicked(clickData);
            }
        });
    }, []);

    return (
        <>
            {loading &&
                <header className={`header-container ${deviceCheck == 'PC' && isHovered ? ' is-hover' : ''} ${isScrolled ? ' is-scrolled' : ''} ${isHeaderFixed ? ' is-fixed' : ''} ${deviceCheck == 'PC' ? 'is-pc' : ''}`}
                                            onMouseLeave={() => deviceCheck == 'PC' && handleMenuLeave(1)}
                                            data-color={`${isHeaderColor == 'bright' ? 'bright' : 'dark'}`}>
                <div className="logo-container">
                    <Link href={'/'}><LogoBasic width={deviceCheck == 'PC' ? 60 : 40} /></Link>
                </div>
                {deviceCheck == 'PC' && <>
                    <div className="gnb-container">
                        {menuList.length > 0 ? renderMenuItems(menuList, 1, 1) : <>
                            <ul className="menu_1ul">
                                <li className="menu_1li"><span></span></li>
                                <li className="menu_1li"><span></span></li>
                                <li className="menu_1li"><span></span></li>
                            </ul>
                        </>}
                    </div>
                    <div className={`header-container-bg ${isHovered ? ' is-hover' : ''}`} />
                </>}
                <div className="util-container">
                    <Button className="cart" data-type={'icon'} width={'md'} onClick={()=>dispatch(checkBasketSidebarOpen(true))}>
                        <FontAwesomeIcon icon={faCartShopping} />
                        <span>
                            <i>{basketProductData.length}</i>
                        </span>
                    </Button>
                    {deviceCheck !== 'PC' &&
                        <Button className="menu" data-type={'icon'} width={'md'} onClick={()=>dispatch(checkMenuSidebarOpen(true))}>
                            <FontAwesomeIcon icon={faBars} />
                        </Button>
                    }
                </div>
            </header>}
            {loading && <BasketSidebar></BasketSidebar>}
            {deviceCheck !== 'PC' && loading && <>
                <MenuSidebar>
                    {menuList && renderMenuItems(menuList, 1, 1)}
                </MenuSidebar>
            </>}
        </>
    );

};

export default Header;