import { Reducer } from 'redux';
import {ProductData, BasketData} from '../types/types';

interface initialState {
    product: ProductData[];
    basket: BasketData[];
}

const initialState = {
    product : [
        {
            product_no: 1,
            name: '눈건강 영양제',
            eng_name: 'Eye Health Supplement',
            image_main: `/images/prd-img01.jpg`,
            retail_price: 25000,
            sell_price: 25000,
            sale_price: 23000,
            summary_desc: '우리 아이의 눈 건강을 위한 영양제',
            review_count: 99,
            update_date: "2023-11-01T10:06:49.675Z",
            hit_count: 9999,
        },
        {
            product_no: 2,
            name: '관절 건강 영양제',
            eng_name: 'Joint Health Supplement',
            image_main: `/images/prd-img02.jpg`,
            retail_price: 30000,
            sell_price: 30000,
            sale_price: 26000,
            summary_desc: '우리 아이의 관절 건강을 위한 영양제',
            review_count: 1299,
            update_date: "2023-11-01T10:08:40.506Z",
            hit_count: 4878,
        },
        {
            product_no: 3,
            name: '장 건강 영양제',
            eng_name: 'Digestive Health Supplement',
            image_main: `/images/prd-img03.jpg`,
            retail_price: 29000,
            sell_price: 29000,
            sale_price: 29000,
            summary_desc: '우리 아이의 장 건강을 위한 영양제',
            review_count: 11,
            update_date: "2023-11-01T10:09:00.659Z",
            hit_count: 454857,
        },
        {
            product_no: 4,
            name: '종합 건강 영양제',
            eng_name: 'Comprehensive Health Supplement',
            image_main: `/images/prd-img04.jpg`,
            retail_price: 129000,
            sell_price: 129000,
            sale_price: 125000,
            summary_desc: '우리 아이의 건강을 위한 종합 영양제',
            review_count: 15484,
            update_date: "2023-11-01T10:09:11.218Z",
            hit_count: 454548,
        },
        {
            product_no: 5,
            name: '종합 건강 영양제',
            eng_name: 'Comprehensive Health Supplement',
            image_main: '/images/prd-img05.jpg',
            retail_price: 129000,
            sell_price: 129000,
            sale_price: 125000,
            summary_desc: '우리 아이의 건강을 위한 종합 영양제',
            review_count: 15484,
            update_date: "2023-11-01T13:23:08.200Z",
            hit_count: 4477,
        },
        {
            product_no: 6,
            name: '눈건강 영양제',
            eng_name: 'Eye Health Supplement',
            image_main: `/images/prd-img01.jpg`,
            retail_price: 25000,
            sell_price: 25000,
            sale_price: 23000,
            summary_desc: '우리 아이의 눈 건강을 위한 영양제',
            review_count: 99,
            update_date: "2023-11-01T10:06:49.675Z",
            hit_count: 9999,
        },
        {
            product_no: 7,
            name: '관절 건강 영양제',
            eng_name: 'Joint Health Supplement',
            image_main: `/images/prd-img02.jpg`,
            retail_price: 30000,
            sell_price: 30000,
            sale_price: 26000,
            summary_desc: '우리 아이의 관절 건강을 위한 영양제',
            review_count: 1299,
            update_date: "2023-11-01T10:08:40.506Z",
            hit_count: 4878,
        },
        {
            product_no: 8,
            name: '장 건강 영양제',
            eng_name: 'Digestive Health Supplement',
            image_main: `/images/prd-img03.jpg`,
            retail_price: 29000,
            sell_price: 29000,
            sale_price: 29000,
            summary_desc: '우리 아이의 장 건강을 위한 영양제',
            review_count: 11,
            update_date: "2023-11-01T10:09:00.659Z",
            hit_count: 454857,
        },
        {
            product_no: 9,
            name: '종합 건강 영양제',
            eng_name: 'Comprehensive Health Supplement',
            image_main: `/images/prd-img04.jpg`,
            retail_price: 129000,
            sell_price: 129000,
            sale_price: 125000,
            summary_desc: '우리 아이의 건강을 위한 종합 영양제',
            review_count: 15484,
            update_date: "2023-11-01T10:09:11.218Z",
            hit_count: 454548,
        },
        {
            product_no: 10,
            name: '종합 건강 영양제',
            eng_name: 'Comprehensive Health Supplement',
            image_main: '/images/prd-img05.jpg',
            retail_price: 129000,
            sell_price: 129000,
            sale_price: 125000,
            summary_desc: '우리 아이의 건강을 위한 종합 영양제',
            review_count: 15484,
            update_date: "2023-11-01T13:23:08.200Z",
            hit_count: 4477,
        },
        {
            product_no: 11,
            name: '눈건강 영양제',
            eng_name: 'Eye Health Supplement',
            image_main: `/images/prd-img01.jpg`,
            retail_price: 25000,
            sell_price: 25000,
            sale_price: 23000,
            summary_desc: '우리 아이의 눈 건강을 위한 영양제',
            review_count: 99,
            update_date: "2023-11-01T10:06:49.675Z",
            hit_count: 9999,
        },
        {
            product_no: 12,
            name: '관절 건강 영양제',
            eng_name: 'Joint Health Supplement',
            image_main: `/images/prd-img02.jpg`,
            retail_price: 30000,
            sell_price: 30000,
            sale_price: 26000,
            summary_desc: '우리 아이의 관절 건강을 위한 영양제',
            review_count: 1299,
            update_date: "2023-11-01T10:08:40.506Z",
            hit_count: 4878,
        },
        {
            product_no: 13,
            name: '장 건강 영양제',
            eng_name: 'Digestive Health Supplement',
            image_main: `/images/prd-img03.jpg`,
            retail_price: 29000,
            sell_price: 29000,
            sale_price: 29000,
            summary_desc: '우리 아이의 장 건강을 위한 영양제',
            review_count: 11,
            update_date: "2023-11-01T10:09:00.659Z",
            hit_count: 454857,
        },
        {
            product_no: 14,
            name: '종합 건강 영양제',
            eng_name: 'Comprehensive Health Supplement',
            image_main: `/images/prd-img04.jpg`,
            retail_price: 129000,
            sell_price: 129000,
            sale_price: 125000,
            summary_desc: '우리 아이의 건강을 위한 종합 영양제',
            review_count: 15484,
            update_date: "2023-11-01T10:09:11.218Z",
            hit_count: 454548,
        },
        {
            product_no: 15,
            name: '종합 건강 영양제',
            eng_name: 'Comprehensive Health Supplement',
            image_main: '/images/prd-img05.jpg',
            retail_price: 129000,
            sell_price: 129000,
            sale_price: 125000,
            summary_desc: '우리 아이의 건강을 위한 종합 영양제',
            review_count: 15484,
            update_date: "2023-11-01T13:23:08.200Z",
            hit_count: 4477,
        },
        {
            product_no: 16,
            name: '눈건강 영양제',
            eng_name: 'Eye Health Supplement',
            image_main: `/images/prd-img01.jpg`,
            retail_price: 25000,
            sell_price: 25000,
            sale_price: 23000,
            summary_desc: '우리 아이의 눈 건강을 위한 영양제',
            review_count: 99,
            update_date: "2023-11-01T10:06:49.675Z",
            hit_count: 9999,
        },
        {
            product_no: 17,
            name: '관절 건강 영양제',
            eng_name: 'Joint Health Supplement',
            image_main: `/images/prd-img02.jpg`,
            retail_price: 30000,
            sell_price: 30000,
            sale_price: 26000,
            summary_desc: '우리 아이의 관절 건강을 위한 영양제',
            review_count: 1299,
            update_date: "2023-11-01T10:08:40.506Z",
            hit_count: 4878,
        },
        {
            product_no: 18,
            name: '장 건강 영양제',
            eng_name: 'Digestive Health Supplement',
            image_main: `/images/prd-img03.jpg`,
            retail_price: 29000,
            sell_price: 29000,
            sale_price: 29000,
            summary_desc: '우리 아이의 장 건강을 위한 영양제',
            review_count: 11,
            update_date: "2023-11-01T10:09:00.659Z",
            hit_count: 454857,
        },
        {
            product_no: 19,
            name: '종합 건강 영양제',
            eng_name: 'Comprehensive Health Supplement',
            image_main: `/images/prd-img04.jpg`,
            retail_price: 129000,
            sell_price: 129000,
            sale_price: 125000,
            summary_desc: '우리 아이의 건강을 위한 종합 영양제',
            review_count: 15484,
            update_date: "2023-11-01T10:09:11.218Z",
            hit_count: 454548,
        },
        {
            product_no: 20,
            name: '종합 건강 영양제',
            eng_name: 'Comprehensive Health Supplement',
            image_main: '/images/prd-img05.jpg',
            retail_price: 129000,
            sell_price: 129000,
            sale_price: 125000,
            summary_desc: '우리 아이의 건강을 위한 종합 영양제',
            review_count: 15484,
            update_date: "2023-11-01T13:23:08.200Z",
            hit_count: 4477,
        },
        {
            product_no: 21,
            name: '눈건강 영양제',
            eng_name: 'Eye Health Supplement',
            image_main: `/images/prd-img01.jpg`,
            retail_price: 25000,
            sell_price: 25000,
            sale_price: 23000,
            summary_desc: '우리 아이의 눈 건강을 위한 영양제',
            review_count: 99,
            update_date: "2023-11-01T10:06:49.675Z",
            hit_count: 9999,
        },
        {
            product_no: 22,
            name: '관절 건강 영양제',
            eng_name: 'Joint Health Supplement',
            image_main: `/images/prd-img02.jpg`,
            retail_price: 30000,
            sell_price: 30000,
            sale_price: 26000,
            summary_desc: '우리 아이의 관절 건강을 위한 영양제',
            review_count: 1299,
            update_date: "2023-11-01T10:08:40.506Z",
            hit_count: 4878,
        },
        {
            product_no: 23,
            name: '장 건강 영양제',
            eng_name: 'Digestive Health Supplement',
            image_main: `/images/prd-img03.jpg`,
            retail_price: 29000,
            sell_price: 29000,
            sale_price: 29000,
            summary_desc: '우리 아이의 장 건강을 위한 영양제',
            review_count: 11,
            update_date: "2023-11-01T10:09:00.659Z",
            hit_count: 454857,
        },
        {
            product_no: 24,
            name: '종합 건강 영양제',
            eng_name: 'Comprehensive Health Supplement',
            image_main: `/images/prd-img04.jpg`,
            retail_price: 129000,
            sell_price: 129000,
            sale_price: 125000,
            summary_desc: '우리 아이의 건강을 위한 종합 영양제',
            review_count: 15484,
            update_date: "2023-11-01T10:09:11.218Z",
            hit_count: 454548,
        },
        {
            product_no: 25,
            name: '종합 건강 영양제',
            eng_name: 'Comprehensive Health Supplement',
            image_main: '/images/prd-img05.jpg',
            retail_price: 129000,
            sell_price: 129000,
            sale_price: 125000,
            summary_desc: '우리 아이의 건강을 위한 종합 영양제',
            review_count: 15484,
            update_date: "2023-11-01T13:23:08.200Z",
            hit_count: 4477,
        },
    ],
    basket: [],
};

export const ProductReducers: Reducer<initialState> = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_BASKETDATA':
            let inputData = action.payload;
            let chkData = state.basket.filter(function(e){
                if(e.product_no == inputData.product_no && e.option_name == inputData.option_name){
                    return true;
                }
            })
            if(chkData.length > 0){
                const modifyData = state.basket.map(item => {
                    if (item.product_no === inputData.product_no && item.option_name == inputData.option_name) {
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
                if (item.product_no === action.payload.product_no) {
                    return action.payload;
                }
                return item;
            });
            return { ...state, basket: modifyData };
        case 'DELETE_TO_BASKETDATA':
            const deleteData = state.basket.filter(data => (data.product_no !== action.payload.product_no || data.product_no == action.payload.product_no && data.option_name !== action.payload.option_name));
            return { ...state, basket: deleteData };
        case 'DELETE_ALL_TO_BASKETDATA':
            return { ...state, basket: [] };
        default:
            return state;
    }
};

