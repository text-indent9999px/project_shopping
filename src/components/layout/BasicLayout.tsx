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
import {checkBasketSidebarOpen, checkHeaderFixed, detectDevice, checkMenuSidebarOpen} from "@/actions/actions";
import {useMediaQuery} from "react-responsive";
import ScrollHandler from "@/components/event/ScrollHandler";


interface LayoutProps {
    children: React.ReactNode;
    metadata: {
        title: string;
        description: string;
    };
    headerFixed?: boolean;
}

const BasicLayout: React.FC<LayoutProps> = ({ children, metadata, headerFixed = false}) => {

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

    const [loading, setLoading] = useState(false);


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
        // const headerFixedElement = document.querySelector('[data-header-fixed=true]') as HTMLElement;
        // const isHeaderFixed = !!headerFixedElement;
        dispatch(checkHeaderFixed(headerFixed));
        dispatch(checkBasketSidebarOpen(false));
        dispatch(checkMenuSidebarOpen(false));
        setLoading(true);
    }, []);


    const isPopupOpen = useSelector((state: RootState) => state.popup.isActive);
    const isDimmedOpen = useSelector((state: RootState) => state.dimmed.isActive);

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            {loading && <div id="wrap">
                <Header></Header>
                <div className="contents-container">
                    {children}
                </div>
                <Footer></Footer>
            </div>}
            {isDimmedOpen && <Dimmed></Dimmed>}
            {isPopupOpen && <Popup></Popup>}
            <ScrollHandler /> {/* 스크롤 이벤트 처리 컴포넌트 사용 */}
        </>
    );
};


export default BasicLayout;