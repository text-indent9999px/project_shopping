import { Reducer } from 'redux';
import {BrowserState} from '@/types/types';
import {isMobile} from "react-device-detect";

const initialState: BrowserState = {
    isMobile : isMobile,
    device: 'PC',
    PCMediaQuery: '(min-width: 1300px)',
    TABLETMediaQueryMin: '(min-width: 768px)',
    TABLETMediaQueryMax: '(max-width: 1299px)',
    MOBILEMediaQuery: '(max-width: 767px)',
};

export const BrowserReducers: Reducer<BrowserState> = (state = initialState, action) => {
    switch (action.type) {
        case 'BROWSER_IS_MOBILE' :
            return { ...state, isMobile: action.payload };
        case 'BROWSER_DEVICE_TYPE' :
            return { ...state, device: action.payload };
        default:
            return state;
    }
};