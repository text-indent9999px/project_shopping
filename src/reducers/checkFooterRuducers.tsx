import { Reducer } from 'redux';
import {FooterState} from '@/types/types';

const initialState: FooterState = {
    footerHeight: 0,
};

export const CheckFooterReducers: Reducer<FooterState> = (state = initialState, action) => {
    switch (action.type) {
        case 'CHECK_FOOTER_HEIGHT':
            return {
                ...state,
                footerHeight: action.payload,
            };
        default:
            return state;
    }
};