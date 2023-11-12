import React, {useRef, useEffect, useState} from "react";
import {useSelector} from "react-redux";

const metadata = {
    title: 'Prd Detail Page',
    description: 'This is the test page',
};

import {get, getDatabase, onValue, ref, set} from "firebase/database";

export default function PrdDetail() {


    // const database = useSelector((state) => state.firebase.database);
    // const productListRef = ref(database, 'product_list/category/11');
    //
    // const productData = [];
    //
    // for (let i = 22; i <= 40; i++) {
    //
    //     const randomValue = (Math.floor(Math.random() * 1000) + 1);
    //     const randomValue2 = (Math.floor(Math.random() * 1000) + 1);
    //     const randomValue3 = (Math.floor(Math.random() * 1000) + 1);
    //
    //     const retailPrice = randomValue * 1000;
    //     const sellPrice = (retailPrice - (randomValue2 * 100) < 0 ) ? retailPrice : retailPrice - (randomValue2 * 100) ;
    //     const salePrice = (sellPrice - (randomValue3 * 100) < 0 ) ? sellPrice : sellPrice - (randomValue3 * 100);
    //
    //     const randomTime = new Date(2023, 10, 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));
    //
    //     productData.push({
    //         product_no: i,
    //         name: '상품명 ' + i,
    //         eng_name: 'english name ' + i,
    //         image_main: `https://firebasestorage.googleapis.com/v0/b/projectshopping-ef0b8.appspot.com/o/product%2Fprd-img${i.toString().padStart(2, '0')}.jpg?alt=media&token=f41655a9-f97b-44b6-8653-cf00af91cc87`,
    //         retail_price: retailPrice,
    //         sell_price: sellPrice,
    //         sale_price: salePrice,
    //         summary_desc: '상품 설명 ' + i,
    //         review_count: Math.floor(Math.random() * 100),
    //         update_date: randomTime.toISOString(),
    //         hit_count: Math.floor(Math.random() * 100),
    //         hash_tag: ['해시태그1', '해시태그2', '해시태그3'],
    //         option: [
    //             {
    //                 option_code: 'P' + (randomValue) * 1000,
    //                 option_name: '옵션명1',
    //                 option_value: (randomValue2 % 2 == 0) ? randomValue2 : -1 * randomValue2,
    //                 sold_out: true,
    //             },
    //             {
    //                 option_code: 'P' + (randomValue2) * 1000,
    //                 option_name: '옵션명2',
    //                 option_value: (randomValue % 2 == 0) ? randomValue : -1 * randomValue,
    //                 sold_out: false,
    //             },
    //             {
    //                 option_code: 'P' + (randomValue3) * 1000,
    //                 option_name: '옵션명3',
    //                 option_value: (randomValue3 % 2 == 0) ? randomValue3 : -1 * randomValue3,
    //                 sold_out: false,
    //             },
    //         ],
    //         shipping_fee: 3000,
    //         image_add: [
    //             `https://firebasestorage.googleapis.com/v0/b/projectshopping-ef0b8.appspot.com/o/product%2Fprd-img${(i).toString().padStart(2, '0')}.jpg?alt=media&token=f41655a9-f97b-44b6-8653-cf00af91cc87`,
    //             `https://firebasestorage.googleapis.com/v0/b/projectshopping-ef0b8.appspot.com/o/product%2Fprd-img${(i).toString().padStart(2, '0')}.jpg?alt=media&token=f41655a9-f97b-44b6-8653-cf00af91cc87`,
    //             `https://firebasestorage.googleapis.com/v0/b/projectshopping-ef0b8.appspot.com/o/product%2Fprd-img${(i).toString().padStart(2, '0')}.jpg?alt=media&token=f41655a9-f97b-44b6-8653-cf00af91cc87`,
    //         ],
    //         icon: [
    //             (i % 11 == 0) ? 'SOLD OUT' : '',
    //         ],
    //     });
    // }
    //
    // // 제품 데이터를 Firebase Realtime Database에 추가
    // set(productListRef, productData)
    //     .then(() => {
    //         console.log("Products data added to the database.");
    //     })
    //     .catch((error) => {
    //         console.error("Error adding products data to the database:", error);
    //     });


    // const database = useSelector((state) => state.firebase.database);
    // const productListRef = ref(database, 'product_list');
    //
    // onValue(productListRef, (snapshot) => {
    //     if (snapshot.exists()) {
    //         const data = snapshot.val();
    //         console.log('index data load complete');
    //         const productData = [];
    //
    //         let test = data.category['11'];
    //         let test2 = test.concat(data.category['10'])
    //         console.log(test2);
    //
    //         const productListRef2 = ref(database, 'product_list/all');
    //
    //         //console.log(data.category['10']);
    //         set(productListRef2, test2)
    //             .then(() => {
    //                 console.log("Products data added to the database.");
    //             })
    //             .catch((error) => {
    //                 console.error("Error adding products data to the database:", error);
    //             });
    //     } else {
    //         console.log('No data available');
    //     }
    // });





    return (
        <></>
    );
}