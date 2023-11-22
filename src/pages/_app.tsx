import React from 'react';
import {Provider} from 'react-redux';
import store from '../store/store';
import { AppProps } from 'next/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import GlobalCustomScrollBar from "@/components/scroll/GlobalCustomScrollBar";
library.add(fas);


function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Component {...pageProps} />
            <GlobalCustomScrollBar></GlobalCustomScrollBar>
        </Provider>
    );
}

export default MyApp;