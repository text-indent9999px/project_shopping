import React, {useState, useEffect} from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import '../../styles/reset.scss';
import 'swiper/swiper-bundle.css';
import '../../styles/globals.scss';
import {useDispatch, useSelector} from 'react-redux';
import Dimmed from "@/components/common/Dimmed";
import Popup from "@/components/popup/popup";
import {RootState} from "@/types/types";
import {
    checkBasketSidebarOpen,
    detectDevice,
    checkMenuSidebarOpen,
} from "@/actions/actions";
import {useMediaQuery} from "react-responsive";
import ScrollHandler from "@/components/event/ScrollHandler";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/router";

interface LayoutProps {
    children: React.ReactNode;
    headerFixed?: boolean;
}

const BasicLayout: React.FC<LayoutProps> = ({ children, headerFixed = false}) => {

    const dispatch = useDispatch();
    const router = useRouter();
    const PCMediaQuery = useSelector((state:RootState) => state.browser.PCMediaQuery);
    const TABLETMediaQueryMin = useSelector((state:RootState) => state.browser.TABLETMediaQueryMin);
    const TABLETMediaQueryMax = useSelector((state:RootState) => state.browser.TABLETMediaQueryMax);
    const MOBILEMediaQuery = useSelector((state:RootState) => state.browser.MOBILEMediaQuery);
    const isMobile = useMediaQuery({query: MOBILEMediaQuery,});
    const isTabletMin = useMediaQuery({query: TABLETMediaQueryMin,});
    const isTabletMax = useMediaQuery({query: TABLETMediaQueryMax,});
    const isPc = useMediaQuery({ query: PCMediaQuery });
    const [loading, setLoading] = useState(false);
    const [routerEvents, setRouterEvents] = useState(0);
    const [currentMenu, setCurrentMenu] = useState('');

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
        if (typeof document !== 'undefined') {
            setLoading(true);
            // dispatch(checkHeaderFixed(headerFixed));

            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty("--vh", `${vh}px`);
            document.documentElement.style.setProperty("--vh-fixed", `${vh}px`);

            const setMobileHeight = () => {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty("--vh", `${vh}px`);
            }
            window.addEventListener('resize', setMobileHeight);
            return () => window.removeEventListener('resize', setMobileHeight);
        }
    }, []);

    useEffect(() => {
        const handleRouteChange = () => {
            setRouterEvents(Math.random());
            dispatch(checkBasketSidebarOpen(false));
            dispatch(checkMenuSidebarOpen(false));
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {
            router.events.off('routeChangeComplete', handleRouteChange);
        };
    }, [router.asPath]);

    useEffect(() => {
        // window.scrollTo(0, 0);
        setCurrentMenu(router.asPath);
    },[loading, routerEvents]);

    const isFooter = useSelector((state:RootState) => state.scroll.isFooter);
    const isScrolled = useSelector((state:RootState) => state.scroll.isScrolled);


    const goTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <>
            <Header currentMenu={currentMenu} check={routerEvents} loading={loading}></Header>
            {children}
            <Footer></Footer>
            <div className={`custom-go-top ${isFooter || ! isScrolled ? 'is-hide' : ''}`} onClick={goTop}>
                <FontAwesomeIcon icon={faArrowUp} />
            </div>
            {loading && <>
                <Dimmed></Dimmed>
                <Popup></Popup>
                <ScrollHandler />
            </>}
        </>
    );
};


export default BasicLayout;