import { Reducer } from 'redux';
import {ProductData, BasketData} from '../types/types';

interface initialState {
    product: ProductData[];
    basket: BasketData[];
}

const initialState = {
    product : [],
    basket: [],
};

export const ProductReducers: Reducer<initialState> = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKETDATA':
            let inputData = action.payload;
            let chkData = state.basket.filter(function(e){
                if(e.product_no == inputData.product_no && e.option_select.option_code == inputData.option_select.option_code){
                    return true;
                }
            })
            if(chkData.length > 0){
                const modifyData = state.basket.map(item => {
                    if (item.product_no === inputData.product_no && item.option_select.option_code == inputData.option_select.option_code) {
                        return inputData;
                    }
                    return item;
                });
                return { ...state, basket: modifyData };
            }else{
                return { ...state, basket: [action.payload, ...state.basket] };
            }
        case 'MODIFY_TO_BASKETDATA':
            const modifyData = state.basket.map(item => {
                if (item.product_no === action.payload.product_no && item.option_select.option_code === action.payload.option_select.option_code) {
                    return action.payload;
                }
                return item;
            });
            return { ...state, basket: modifyData };
        case 'DELETE_TO_BASKETDATA':
            const deleteData = state.basket.filter(data => (data.product_no == action.payload.product_no && data.option_select.option_code !== action.payload.option_select.option_code));
            return { ...state, basket: deleteData };
        case 'DELETE_ALL_TO_BASKETDATA':
            return { ...state, basket: [] };
        default:
            return state;
    }
};

