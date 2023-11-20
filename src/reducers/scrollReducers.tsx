import { Reducer } from 'redux';
import {ScrollState} from '@/types/types';

const initialState: ScrollState = {
    isScrolled: false,
    isFooter: false,
};

export const ScrollReducers: Reducer<ScrollState> = (state = initialState, action) => {
    switch (action.type) {
        case 'SCROLL':
            return {
                ...state,
                isScrolled: action.payload,
            };
        case 'IS_FOOTER':
            return {
                ...state,
                isFooter: action.payload,
            };
        default:
            return state;
    }
};