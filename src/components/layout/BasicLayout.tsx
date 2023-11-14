import React, {useContext, useState, useEffect, useRef} from 'react';
import Head from 'next/head';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import '../../styles/reset.scss';
import '../../styles/globals.scss';

import {useDispatch, useSelector} from 'react-redux';
import Dimmed from "@/components/common/Dimmed";
import Popup from "@/components/popup/popup";
import {RootState} from "@/types/types";
import {checkBasketSidebarOpen, checkHeaderFixed} from "@/actions/actions";


interface LayoutProps {
    children: React.ReactNode;
    metadata: {
        title: string;
        description: string;
    };
}

const BasicLayout: React.FC<LayoutProps> = ({ children, metadata}) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const headerFixedElement = document.querySelector('[data-header-fixed=true]');
        const isHeaderFixed = !!headerFixedElement;
        dispatch(checkHeaderFixed(isHeaderFixed));
        dispatch(checkBasketSidebarOpen(false));
    }, [dispatch]);

    const isPopupOpen = useSelector((state: RootState) => state.popup.isActive);
    const isDimmedOpen = useSelector((state: RootState) => state.dimmed.isActive);

    return (
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
            </Head>
            <div id="wrap">
                <Header>.</Header>
                <div className="contents-container">
                    {children}
                </div>
                <Footer>.</Footer>
                {isDimmedOpen && <Dimmed>.</Dimmed>}
                {isPopupOpen && <Popup>.</Popup>}
            </div>
        </>
    );
};


export default BasicLayout;