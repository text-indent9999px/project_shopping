import { Reducer } from 'redux';
import {ScrollState} from '@/types/types';
import {act} from "react-dom/test-utils";

const initialState: ScrollState = {
    isScrolled: false,
    isFooter: false,
    isDisabled: false,
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
        case 'IS_DISABLED':
            return{
                ...state,
                isDisabled: action.payload,
            }
        default:
            return state;
    }
};