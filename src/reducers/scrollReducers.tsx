import { Reducer } from 'redux';
import {ScrollAction, ScrollState} from '@/types/types';

const initialState: ScrollState = {
    isScrolled: false,
};

export const ScrollReducers: Reducer<ScrollState, ScrollAction> = (state = initialState, action) => {
    switch (action.type) {
        case 'SCROLL':
            return {
                ...state,
                isScrolled: action.payload,
            };
        default:
            return state;
    }
};