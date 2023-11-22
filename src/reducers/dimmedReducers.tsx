import { Reducer } from 'redux';
import {DimmedState} from '@/types/types';

const initialState: DimmedState = {
    isActive: false,
    closeFunctions: {},
};

export const DimmedReducers: Reducer<DimmedState> = (state = initialState, action) => {
    switch (action.type) {
        case 'DIMMED_OPEN' :
            return {...state, isActive : action.payload}
        case 'DIMMED_CLOSE_FUNCTION' :
            let newAction = {... state.closeFunctions};
            newAction[action.payload.key] = action.payload.func;
            return { ...state, closeFunctions: newAction };
        case 'DIMMED_CLOSE_FUNCTION_REMOVE':
            let removeAction = {... state.closeFunctions};
            let key = action.payload;
            if(key == 'all'){
                removeAction = {};
            }else{
                delete removeAction[key];
            }
            return { ...state, closeFunctions: removeAction };
        default:
            return state;
    }
};