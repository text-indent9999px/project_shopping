
export function scrollAction(isScrolled: boolean) {
    return {
        type: 'SCROLL',
        payload: isScrolled,
    };
}
export function scrollFooterCheck(isFooter: boolean) {
    return {
        type: 'IS_FOOTER',
        payload: isFooter,
    };
}

export function scrollDisabledCheck(isDisabled: boolean) {
    return {
        type: 'IS_DISABLED',
        payload: isDisabled,
    };
}

export function checkHeaderFixed(isHeaderFixed: boolean) {
    return {
        type: 'CHECK_HEADER_FIXED',
        payload: isHeaderFixed,
    };
}

export function checkHeaderColor(isHeaderColor: string) {
    return {
        type: 'CHECK_HEADER_COLOR',
        payload: isHeaderColor,
    };
}

export function checkBasketSidebarOpen(isOpen: boolean) {
    return {
        type: 'CHECK_BASKETSIDEBAR_OPEN',
        payload: isOpen,
    };
}

export function checkMenuSidebarOpen(isOpen: boolean) {
    return {
        type: 'CHECK_MENUSIDEBAR_OPEN',
        payload: isOpen,
    };
}

export function checkFooterHeight(footerHeight: number) {
    return {
        type: 'CHECK_FOOTER_HEIGHT',
        payload: footerHeight,
    }
}


export function addToBasketData(data: object) {
    return {
        type: 'ADD_TO_BASKETDATA',
        payload: data,
    };
}

export function modifyToBasketData(data: object) {
    return {
        type: 'MODIFY_TO_BASKETDATA',
        payload: data,
    };
}

export function deleteToBasketData(data: object) {
    return {
        type: 'DELETE_TO_BASKETDATA',
        payload: data,
    };
}

export function deleteAllToBasketData() {
    return {
        type: 'DELETE_ALL_TO_BASKETDATA',
    };
}

export function deleteSelectedItemsToBasketData(arr:string[]){
    return{
        type: 'DELETE_SELECTED_ITEMS_TO_CART',
        payload: arr,
    }
}

export function changeToBasketData(data:object){
    return{
        type: 'CHANGE_TO_BASKETDATA',
        payload: data,
    }
}

export function popupOpen(boo:boolean) {
    return {
        type: 'POPUP_OPEN',
        payload: boo,
    };
}

export function popupType(type:string) {
    return {
        type: 'POPUP_TYPE',
        payload: type,
    };
}
export function popupData(data:object) {
    return {
        type: 'POPUP_DATA',
        payload: data,
    };
}



export function detectIsMobile(boo:boolean){
    return {
        type: 'BROWSER_IS_MOBILE',
        payload: boo,
    }
}

export function detectDevice(str:string){
    return {
        type: 'BROWSER_DEVICE_TYPE',
        payload: str,
    }
}

export function dimmedOpen(boo:boolean){
    return {
        type: 'DIMMED_OPEN',
        payload: boo,
    }
}

export function dimmedCloseFunction(func: () => void, str:string){
    return {
        type: 'DIMMED_CLOSE_FUNCTION',
        payload: {
            key: str,
            func: func,
        },
    }
}

export function dimmedCloseFunctionRemove(str:string){
    return {
        type: 'DIMMED_CLOSE_FUNCTION_REMOVE',
        payload: str,
    }
}