// 액션 타입 상수 정의
import {MouseEvent} from "react";

export const SCROLL = 'SCROLL';
export const CHECKHEADERFIXED = 'CHECK_HEADER_FIXED';
export const CHECKHEADERCOLOR = 'CHECK_HEADER_COLOR';

export interface RootState {
    app: AppState;
    dimmed: DimmedState;
    popup: PopupState;
    productData: ProductData;
    basketData: BasketData;
    product: {basket: ProductData[]},
    check_header: {isBaksetSidebarOpen: boolean, isHeaderFixed: boolean, isHeaderColor: string},
    scroll: { isScrolled: boolean },
    firebase: {
        database: any,
        storage: any,
    },
}

export interface ScrollAction {
    type: typeof SCROLL;
    payload: boolean;
}

export interface AppState {
    isScrolled: boolean;
    isHeaderFixed: boolean;
    isHeaderColor: string,
    isBaksetSidebarOpen: boolean,
}

export interface DimmedState {
    isActive : boolean
}

export interface PopupState {
    isActive : boolean,
    type: string,
    popupData: {
        message: string,
        contents: any,
        okClick : (event: MouseEvent<HTMLButtonElement>) => void;
        cancelClick : (event: MouseEvent<HTMLButtonElement>) => void;
    },
}

export interface Option {
    option_code: string;
    option_name: string;
    option_value: number;
    sold_out: boolean;
}

export interface ProductData {
    product_no: number,
    name: string;
    eng_name: string;
    image_main: string;
    retail_price: number;
    sell_price: number;
    sale_price: number;
    summary_desc: string;
    review_count: number
    update_date: string,
    hit_count: number,
    image_add: [],
    hash_tag: [],
    option: Option[],
    option_select: Option,
    qty_num: number,
    shipping_fee: number,
}

export interface BasketData {
    product_no: number,
    name: string;
    eng_name: string;
    image_main: string;
    retail_price: number;
    sell_price: number;
    sale_price: number;
    summary_desc: string;
    review_count: number
    update_date: string,
    hit_count: number,
    image_add: [],
    hash_tag: [],
    option: Option[],
    option_select: Option,
    qty_num: number,
    shipping_fee: number,
}

export interface fireBaseState{
    database: any,
    storage: any,
}