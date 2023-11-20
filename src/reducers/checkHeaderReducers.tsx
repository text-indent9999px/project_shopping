import { Reducer } from 'redux';
import {HeaderState} from '@/types/types';

const initialState: HeaderState = {
    isHeaderFixed: false,
    isHeaderColor: 'bright',
    isBaksetSidebarOpen : false,
    isMenuSidebarOpen: false,
};

export const CheckHeaderReducers: Reducer<HeaderState> = (state = initialState, action) => {

    switch (action.type) {
        case 'CHECK_HEADER_FIXED':
            return {
                ...state,
                isHeaderFixed: action.payload,
            };
        case 'CHECK_HEADER_COLOR':
            return {
                ...state,
                isHeaderColor: action.payload,
            };
        case 'CHECK_BASKETSIDEBAR_OPEN':
            return {
                ...state,
                isBaksetSidebarOpen: action.payload,
            };
        case 'CHECK_MENUSIDEBAR_OPEN':
            return {
                ...state,
                isMenuSidebarOpen: action.payload,
            };
        default:
            return state;
    }
};