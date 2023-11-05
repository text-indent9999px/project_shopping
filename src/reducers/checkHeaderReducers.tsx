import { Reducer } from 'redux';
import {AppState, CHECKHEADERFIXED, CHECKHEADERCOLOR} from '@/types/types';

const initialState: AppState = {
    isScrolled: false,
    isHeaderFixed: false,
    isHeaderColor: 'bright',
    isBaksetSidebarOpen : false,
};

export const CheckHeaderReducers: Reducer<AppState> = (state = initialState, action) => {
    switch (action.type) {
        case CHECKHEADERFIXED:
            return {
                ...state,
                isHeaderFixed: action.payload,
            };
        case CHECKHEADERCOLOR:
            return {
                ...state,
                isHeaderColor: action.payload,
            };
        case 'CHECK_BASKETSIDEBAR_OPEN':
            return {
                ...state,
                isBaksetSidebarOpen: action.payload,
            };
        default:
            return state;
    }
};