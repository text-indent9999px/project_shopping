import React from "react";
import store from "@/store/store";
import {
    addToBasketData,
    popupOpen,
    deleteToBasketData,
    deleteAllToBasketData, deleteSelectedItemsToBasketData, scrollDisabledCheck, dimmedOpen, popupType, popupData,
} from "@/actions/actions";
import {BasketData} from "@/types/types";

export function disableScroll() {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    store.dispatch(scrollDisabledCheck(true));
}

export function enableScroll() {
    const scrollY = Math.abs(parseInt(document.body.style.top, 10));
    document.body.style.position = '';
    document.body.style.top = '';
    store.dispatch(scrollDisabledCheck(false));
    if(! isNaN(scrollY)){
        window.scrollTo(0, scrollY);
    }
}

export function addToCart(itemData: BasketData[] | BasketData, event: React.MouseEvent<HTMLButtonElement>): any {

    let basketData = store.getState().product.basket;
    function isItemInBasket(item:BasketData) {
        return basketData.some(e => e.product_no === item.product_no && e.option_select.option_code === item.option_select.option_code);
    }

    if (Array.isArray(itemData)) {
        if (itemData.some(isItemInBasket)) {
            const newData = itemData.map(item => {
                const chkData = basketData.find(e => e.product_no === item.product_no && e.option_select.option_code === item.option_select.option_code);
                if (chkData) {
                    item.qty_num = chkData.qty_num + item.qty_num;
                }
                return item;
            });
            confirmCartAdd(newData, event);
        } else {
            cartAnimation(itemData, event);
        }
    } else {
        if (isItemInBasket(itemData)) {
            const chkData = basketData.find(e => e.product_no === itemData.product_no && e.option_select.option_code === itemData.option_select.option_code);
            if (chkData) {
                itemData.qty_num = chkData.qty_num + 1;
                confirmCartAdd(itemData, event);
            }
        } else {
            cartAnimation(itemData, event);
        }
    }

}

export function cartAnimation(itemData:object, event: React.MouseEvent<HTMLButtonElement>): any{

    let isScrollDisabled = store.getState().scroll.isDisabled;
    let scrollDisabledFlag = false;

    if(! isScrollDisabled){
        disableScroll();
        scrollDisabledFlag = true;
    }

    const elements = {
        flyer: event.target as HTMLElement,
        basket: document.querySelector('.header-container .cart') as HTMLElement,
    };

    const options = {
        position: {
            origin: {
                initial: elements.flyer.getBoundingClientRect(),
                offset: { x: -(elements.flyer.clientWidth/2), y: (elements.flyer.clientHeight + 10) },
            },
            destination: {
                initial: elements.basket.getBoundingClientRect(),
            },
        },
    };

    if (elements.flyer && elements.basket) {
        if (document.querySelector('#fly-to-basket')) {
            let beforeElement = document.querySelector('#fly-to-basket') as HTMLElement;
            beforeElement.remove();
        }

        const clonedElement = document.createElement('div');
        clonedElement.id = 'fly-to-basket';
        clonedElement.innerHTML = `<span class="shop-cart"><svg aria-hidden="true" focusable="false" data-prefix="fas" 
                                data-icon="cart-shopping" class="svg-inline--fa fa-cart-shopping" role="img" 
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" 
                                d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z">
                                </path>
                                </svg></span>
                                <span class="plus">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"></path></svg>
                                </span>
                                `;
        clonedElement.style.top = `${options.position.origin.initial.top + (elements.flyer.clientHeight)/2}px`;
        clonedElement.style.left = `${options.position.origin.initial.left - options.position.origin.offset.x}px`;
        clonedElement.style.width = '1px';
        clonedElement.style.height = '1px';
        document.body.appendChild(clonedElement);

        setTimeout(() => {
            const flyToBasket = document.querySelector('#fly-to-basket') as HTMLElement;
            flyToBasket.style.width = '50px';
            flyToBasket.style.height = '50px';
            flyToBasket.style.top = `${options.position.origin.initial.top - options.position.origin.offset.y}px`;
            flyToBasket.style.left = `${options.position.origin.initial.left - options.position.origin.offset.x - 25}px`;
            flyToBasket.classList.add('start');

            setTimeout(() => {
                flyToBasket.classList.add('animation');
                flyToBasket.style.top = `${options.position.destination.initial.top + (elements.basket.clientHeight/4)}px`;
                flyToBasket.style.left = `${options.position.destination.initial.left + (elements.basket.clientWidth/4)}px`;
                flyToBasket.style.width = '20px';
                flyToBasket.style.height = '20px';

                setTimeout(() => {
                    flyToBasket.style.display = 'none';
                    flyToBasket.classList.remove('start');
                    flyToBasket.classList.remove('animation');
                    elements.basket.classList.add('animation');

                    if (Array.isArray(itemData)) {
                        itemData.forEach(item => {
                            const newItem = Object.assign({}, item);
                            store.dispatch(addToBasketData(newItem));
                        });
                    }else{
                        store.dispatch(addToBasketData(itemData));
                    }

                    if(scrollDisabledFlag){
                        enableScroll();
                    }

                    setTimeout(() => {
                        elements.basket.classList.remove('animation');
                    }, 500);

                }, 750);
            }, 800);
        }, 200);
    }
}


export function isEmptyAddOptionList(){
    let data = {
        message: '선택된 옵션이 없습니다.',
        contents: '',
        okClick: function(){store.dispatch(popupOpen(false));},
        cancelClick: function(){store.dispatch(popupOpen(false));},
    };
    store.dispatch(popupOpen(true));
    store.dispatch(popupType('alert'));
    store.dispatch(popupData(data));
}


export function confirmCartAdd(itemData: object, event: React.MouseEvent<HTMLButtonElement>): any {
    let data = {
        message: '이미 장바구니에 담겨있는 상품이 있습니다. \n 추가하여 담으시겠습니까?',
        contents: '',
        okClick: function(){
            cartAnimation(itemData, event);
            store.dispatch(popupOpen(false))
        },
        cancelClick: function(){
            store.dispatch(popupOpen(false))
        },
    };

    store.dispatch(popupOpen(true));
    store.dispatch(popupType('confirm'));
    store.dispatch(popupData(data));
}

export function deleteToCart(itemData: object): any {
    let data = {
        message: '정말 삭제하시겠습니까?',
        contents: '',
        okClick: function(){
            store.dispatch(deleteToBasketData(itemData));
            store.dispatch(popupOpen(false))
        },
        cancelClick: function(){
            store.dispatch(popupOpen(false))
        },
    };
    store.dispatch(popupOpen(true));
    store.dispatch(popupType('confirm'));
    store.dispatch(popupData(data));
}

export function deleteAllToCart(): any {
    let data = {
        message: '장바구니를 비우시겠습니까?',
        contents: '',
        okClick: function(){
            store.dispatch(deleteAllToBasketData());
            store.dispatch(popupOpen(false))
        },
        cancelClick: function(){ store.dispatch(popupOpen(false)) },
    };
    store.dispatch(popupOpen(true));
    store.dispatch(popupType('confirm'));
    store.dispatch(popupData(data));
}

export function deleteSelectedItemsToCart(checkedItmes:string[]): any{
    let data = {
        message: '정말 삭제하시겠습니까?',
        contents: '',
        okClick: function(){
            store.dispatch(deleteSelectedItemsToBasketData(checkedItmes));
            store.dispatch(popupOpen(false))
        },
        cancelClick: function(){ store.dispatch(popupOpen(false))},
    };
    store.dispatch(popupOpen(true));
    store.dispatch(popupType('confirm'));
    store.dispatch(popupData(data));
}


export function checkAverageBright(imgElement: HTMLImageElement) {
    const calculateAverageBrightness = (startY: number, endY: number) => {
        const canvas = document.createElement('canvas');
        canvas.width = imgElement.width;
        canvas.height = endY - startY;
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        ctx.drawImage(imgElement, 0, startY, imgElement.width, endY);
        const imageData = ctx.getImageData(0, startY, imgElement.width, endY).data;
        let totalBrightness = 0;
        for (let i = 0; i < imageData.length; i += 4) {
            const brightness = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
            totalBrightness += brightness;
        }
        return totalBrightness / (imgElement.width * (endY - startY));
    };

    imgElement.dataset.topBright = String(calculateAverageBrightness(0, 100));
}

export function findClosestParent(element: Element | null, str:string) {
    while (element !== null && ! element.querySelector(str)) {
        element = element.parentNode as Element | null;
    }
    return element;
}