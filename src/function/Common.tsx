import React, {ReactNode} from "react";
import store from "@/store/store";
import {
    checkHeaderColor,
    addToBasketData,
    popupOpen,
    deleteToBasketData,
    deleteAllToBasketData
} from "@/actions/actions";

export function addTest(a: number, b: number): number {
    return a + b;
}

export function subtract(a: number, b: number): number {
    return a - b;
}

export function addToCart(itemData: object, event: React.MouseEvent<HTMLButtonElement>): any {
    let basketData = store.getState().product.basket;
    let newData = Object.assign({}, itemData);
    // @ts-ignore
    newData['qty_num'] = 1;
    // @ts-ignore
    newData['option_name'] = '';
    let chkData = basketData.filter(function(e){
        // @ts-ignore
        if(e.product_no == newData.product_no && e.option_name == newData.option_name){
            return true;
        }
    })
    if(chkData.length > 0){
        // @ts-ignore
        newData['qty_num'] = chkData[0]['qty_num'] + 1;
        confirmCartAdd(newData, event);
    }else{
        store.dispatch(addToBasketData(newData));
    }
}

export function confirmCartAdd(itemData: object, event: React.MouseEvent<HTMLButtonElement>): any {
    let data = {
        message: '이미 장바구니에 담겨있는 상품입니다. \n 추가하여 담으시겠습니까?',
            contents: '',
            okClick: function(){ store.dispatch(addToBasketData(itemData));
                store.dispatch(popupOpen(false, 'alert', {
                    message: '',
                    contents: '',
                    okClick: function(){ console.log('ok') },
                    cancelClick: function(){ console.log('cancel') },
                }))
            },
        cancelClick: function(){ store.dispatch(popupOpen(false, 'alert', {
            message: '',
            contents: '',
            okClick: function(){ console.log('ok') },
            cancelClick: function(){ console.log('cancel') },
        })) },
    };
    store.dispatch(popupOpen(true, 'confirm', data));
}

export function deleteToCart(itemData: object): any {
    let data = {
        message: '정말 삭제하시겠습니까?',
        contents: '',
        okClick: function(){ store.dispatch(deleteToBasketData(itemData));
            store.dispatch(popupOpen(false, 'alert', {
                message: '',
                contents: '',
                okClick: function(){ console.log('ok') },
                cancelClick: function(){ console.log('cancel') },
            }))
        },
        cancelClick: function(){ store.dispatch(popupOpen(false, 'alert', {
            message: '',
            contents: '',
            okClick: function(){ console.log('ok') },
            cancelClick: function(){ console.log('cancel') },
        })) },
    };
    store.dispatch(popupOpen(true, 'confirm', data));
}

export function deleteAllToCart(): any {
    let data = {
        message: '장바구니를 비우시겠습니까?',
        contents: '',
        okClick: function(){ store.dispatch(deleteAllToBasketData());
            store.dispatch(popupOpen(false, 'alert', {
                message: '',
                contents: '',
                okClick: function(){ console.log('ok') },
                cancelClick: function(){ console.log('cancel') },
            }))
        },
        cancelClick: function(){ store.dispatch(popupOpen(false, 'alert', {
            message: '',
            contents: '',
            okClick: function(){ console.log('ok') },
            cancelClick: function(){ console.log('cancel') },
        })) },
    };
    store.dispatch(popupOpen(true, 'confirm', data));
}


export function calculateBrightness(el: React.ReactNode, dispatch: any){
    const imgElement = el;
    const canvas = document.createElement('canvas');
    // @ts-ignore
    canvas.width = imgElement.width;
    //canvas.height = imgElement.height;
    canvas.height = 100;
    const ctx = canvas.getContext('2d');
    // @ts-ignore
    ctx.drawImage(imgElement, 0, 0, imgElement.width, 100);
    // @ts-ignore
    const imageData = ctx.getImageData(0, 0, imgElement.width, 100).data;
    let totalBrightness = 0;
    for (let i = 0; i < imageData.length; i += 4) {
        const brightness = (imageData[i] + imageData[i + 1] + imageData[i + 2]) / 3;
        totalBrightness += brightness;
    }
    // @ts-ignore
    const averageBrightness = totalBrightness / (imgElement.width * 100);
    if (averageBrightness >= 128) {
        store.dispatch(checkHeaderColor('bright'));
    } else {
        store.dispatch(checkHeaderColor('dark'));
    }
};


export function intersectionObserve(el: React.ReactNode, func: any){
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    };
    // @ts-ignore
    const callback = (entries, observer) => {
        // @ts-ignore
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                func(el);
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);
    // @ts-ignore
    observer.observe(el);
};