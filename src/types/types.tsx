// 액션 타입 상수 정의
import {MouseEvent} from "react";
import exp from "constants";

export const SCROLL = 'SCROLL';

export interface RootState {
    // app: AppState;
    productData: ProductData;
    basketData: BasketData;

    dimmed: DimmedState;
    popup: PopupState;
    product: {basket: ProductData[]},
    check_header: HeaderState,
    check_footer: FooterState,
    scroll: ScrollState,
    firebase: {
        database: any,
        storage: any,
    },
    browser: BrowserState,
}

export interface BrowserState {
    isMobile : boolean,
    PCMediaQuery: string,
    TABLETMediaQueryMin: string,
    TABLETMediaQueryMax: string,
    MOBILEMediaQuery: string,
    device : string,
}


export interface ScrollAction {
    type: typeof SCROLL;
    payload: boolean;
}

export interface ScrollState {
    isScrolled: boolean,
    isFooter: boolean,
    isDisabled: boolean,
}

export interface HeaderState {
    isHeaderFixed: boolean,
    isHeaderColor: string,
    isBaksetSidebarOpen: boolean,
    isMenuSidebarOpen : boolean,
}

export interface FooterState{
    footerHeight: number,
}

export interface DimmedState {
    isActive : boolean,
    closeFunctions: {
        [key: string]: () => void;
    };
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