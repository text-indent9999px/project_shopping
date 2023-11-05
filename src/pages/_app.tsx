import { Provider } from 'react-redux';
import store from '../store/store';
import { AppProps } from 'next/app';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);
import {ProjectProvider} from "@/context/context";
import {prefix} from "@/config/config";

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <ProjectProvider value={{ prefix }}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </ProjectProvider>
    );
}

export default MyApp;