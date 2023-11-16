import React, {useContext, useState, useEffect, useRef} from 'react';
import Head from 'next/head';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import '../../styles/reset.scss';
import 'swiper/swiper-bundle.css';
import '../../styles/globals.scss';

import {useDispatch, useSelector} from 'react-redux';
import Dimmed from "@/components/common/Dimmed";
import Popup from "@/components/popup/popup";
import {RootState} from "@/types/types";
import {checkBasketSidebarOpen, checkHeaderFixed, detectDevice, detectIsMobile} from "@/actions/actions";
import {useMediaQuery} from "react-responsive";


interface LayoutProps {
    children: React.ReactNode;
    metadata: {
        title: string;
        description: string;
    };
}

const BasicLayout: React.FC<LayoutProps> = ({ children, metadata}) => {

    const dispatch = useDispatch();
    const PCMediaQuery = useSelector((state:RootState) => state.browser.PCMediaQuery);
    const TABLETMediaQueryMin = useSelector((state:RootState) => state.browser.TABLETMediaQueryMin);
    const TABLETMediaQueryMax = useSelector((state:RootState) => state.browser.TABLETMediaQueryMax);
    const MOBILEMediaQuery = useSelector((state:RootState) => state.browser.MOBILEMediaQuery);

    // const isDesktopOrLaptop = (useMediaQuery({query: '(min-width: 1224px)'}));
    // const isBigScreen = useMediaQuery({ query: '(min-width: 1824px)' })
    // const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
    // const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
    // const isRetina = useMediaQuery({ query: '(min-resolution: 2dppx)' })

    const isMobile = useMediaQuery({query: MOBILEMediaQuery,});
    const isTabletMin = useMediaQuery({query: TABLETMediaQueryMin,});
    const isTabletMax = useMediaQuery({query: TABLETMediaQueryMax,});
    const isPc = useMediaQuery({ query: PCMediaQuery });


    useEffect(()=>{
        if(isMobile){
            dispatch(detectDevice('MOBILE'));
        }else if(isTabletMin && isTabletMax){
            dispatch(detectDevice('TABLET'));
        }else if(isPc){
            dispatch(detectDevice('PC'));
        }else{
            dispatch(detectDevice('ERROR'));
        }
    }, [isMobile, isTabletMax, isTabletMin, isPc])


    useEffect(() => {
        const headerFixedElement = document.querySelector('[data-header-fixed=true]') as HTMLElement;
        const isHeaderFixed = !!headerFixedElement;
        dispatch(checkHeaderFixed(isHeaderFixed));
        dispatch(checkBasketSidebarOpen(false));
    }, []);


    const isPopupOpen = useSelector((state: RootState) => state.popup.isActive);
    const isDimmedOpen = useSelector((state: RootState) => state.dimmed.isActive);

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <div id="wrap">
                <Header></Header>
                <div className="contents-container">
                    {children}
                </div>
                <Footer></Footer>
                {isDimmedOpen && <Dimmed></Dimmed>}
                {isPopupOpen && <Popup></Popup>}
            </div>
        </>
    );
};


export default BasicLayout;