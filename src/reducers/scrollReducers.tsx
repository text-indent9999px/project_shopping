import { Reducer } from 'redux';
import {AppState, ScrollAction, SCROLL } from '@/types/types';

const initialState: AppState = {
    isScrolled: false,
    isHeaderFixed: false,
    isHeaderColor: 'bright',
    isBaksetSidebarOpen: false,
};

export const ScrollReducers: Reducer<AppState, ScrollAction> = (state = initialState, action) => {
    switch (action.type) {
        case SCROLL:
            return {
                ...state,
                isScrolled: action.payload,
            };
        default:
            return state;
    }
};