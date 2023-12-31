import React from 'react';
import {Provider} from 'react-redux';
import store from '../store/store';
import { AppProps } from 'next/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import GlobalCustomScrollBar from "@/components/scroll/GlobalCustomScrollBar";
library.add(fas);

import '@fortawesome/fontawesome-svg-core/styles.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import BasicLayout from "@/components/layout/BasicLayout";
config.autoAddCss = false

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <BasicLayout><Component {...pageProps} /></BasicLayout>
            <GlobalCustomScrollBar></GlobalCustomScrollBar>
        </Provider>
    );
}

export default MyApp;