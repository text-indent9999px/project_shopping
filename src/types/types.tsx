// 액션 타입 상수 정의
export const SCROLL = 'SCROLL';
export const CHECKHEADERFIXED = 'CHECK_HEADER_FIXED';
export const CHECKHEADERCOLOR = 'CHECK_HEADER_COLOR';

export interface RootState {
    app: AppState;
    dimmed: DimmedState;
    popup: PopupState;
    productData: ProductData;
    basketData: BasketData;
}

// 액션 객체의 타입 정의
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
    popupData: object,
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
    qty_num: number,
    option_name: string,
}

export interface fireBaseState{
    database: object,
    storage: object,
}