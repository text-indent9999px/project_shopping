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
            const deleteData = state.basket.filter(data => (data.option_select.option_code !== action.payload.option_select.option_code));
            return { ...state, basket: deleteData };
        case 'DELETE_ALL_TO_BASKETDATA':
            return { ...state, basket: [] };
        case 'CHANGE_TO_BASKETDATA' :
            let beforeData = action.payload.before;
            let afterData = action.payload.after;
            const filterData = state.basket.filter(data => (data.option_select.option_code !== beforeData.option_select.option_code));
            const chkData2 = filterData.filter(data => (data.option_select.option_code === afterData.option_select.option_code));
            if(chkData2.length > 0){
                const modifyData2 = filterData.map(item => {
                    if (item.product_no === afterData.product_no && item.option_select.option_code == afterData.option_select.option_code) {
                        afterData.qty_num = afterData.qty_num + item.qty_num;
                        return afterData;
                    }
                    return item;
                });
                return { ...state, basket: modifyData2 };
            }else{
                if(filterData.length > 0){
                    filterData.unshift(afterData);
                    return { ...state, basket: filterData };
                }else{
                    return { ...state, basket: [afterData] };
                }
            }
        default:
            return state;
    }
};

