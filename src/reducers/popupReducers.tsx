import { Reducer } from 'redux';
import {PopupState} from '@/types/types';

const initialState: PopupState = {
    isActive: false,
    type: 'alert',
    popupData: {
        message: '',
        contents: '',
        okClick: function(){ console.log('ok') },
        cancelClick: function(){ console.log('cancel') },
    },
};

export const PopupReducers: Reducer<PopupState> = (state = initialState, action) => {
    switch (action.type) {
        case 'POPUP_OPEN' :
            return {
                ...state,
                isActive: action.payload.isActive,
                type: action.payload.type,
                popupData: action.payload.popupData,
            };
        default:
            return state;
    }
};