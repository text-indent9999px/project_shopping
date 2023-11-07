import BasicLayout from '@/components/layout/BasicLayout';
import Link from "next/link";
import Product1 from "@/components/product/Product1";
import {useSelector} from "react-redux";
import {AppState, ProductData} from "@/types/types";

const metadata = {
    title: 'Prd Detail Page',
    description: 'This is the test page',
};

import { getDatabase, ref, set } from "firebase/database";


export default function PrdDetail() {

// @ts-ignore
    const storage = useSelector((state) => state.firebase.storage);

// // 이미지 경로를 가리키는 참조 생성
//     const imageRef = ref(storage, "product/prd-img01.jpg"); // 여기서 "images/image.jpg"는 업로드한 이미지의 경로에 해당하는 부분입니다.
//
// // 이미지 URL 가져오기
//     getDownloadURL(imageRef)
//         .then((url) => {
//             // 이미지 URL을 사용하여 이미지를 표시하거나 다른 용도로 활용할 수 있습니다.
//             console.log("Image URL:", url);
//         })
//         .catch((error) => {
//             console.error("Error getting image URL:", error);
//         });



    const database = useSelector((state) => state.firebase.database);
    const productListRef = ref(database, 'product_list/category/11');

    const productData = [];

    for (let i = 22; i <= 40; i++) {

        const randomValue = (Math.floor(Math.random() * 1000) + 1);
        const randomValue2 = (Math.floor(Math.random() * 1000) + 1);
        const randomValue3 = (Math.floor(Math.random() * 1000) + 1);

        const retailPrice = randomValue * 1000;
        const sellPrice = retailPrice - (randomValue2 * 100)
        const salePrice = sellPrice - (randomValue3 * 100)

        const randomTime = new Date(2023, 10, 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));

        productData.push({
            product_no: i,
            name: '상품명 ' + i,
            eng_name: 'english name ' + i,
            image_main: `https://firebasestorage.googleapis.com/v0/b/projectshopping-ec984.appspot.com/o/product%2Fprd-img${i.toString().padStart(2, '0')}.jpg?alt=media&token=01f6a147-5825-4720-bd16-34b481eefc3a`,
            retail_price: retailPrice,
            sell_price: sellPrice,
            sale_price: salePrice,
            summary_desc: '상품 설명 ' + i,
            review_count: Math.floor(Math.random() * 100),
            update_date: randomTime.toISOString(),
            hit_count: Math.floor(Math.random() * 100)
        });
    }


// // 제품 데이터를 Firebase Realtime Database에 추가
// set(productListRef, productData)
//     .then(() => {
//         console.log("Products data added to the database.");
//     })
//     .catch((error) => {
//         console.error("Error adding products data to the database:", error);
//     });


    return (
        <BasicLayout metadata={metadata}>
            작업중
        </BasicLayout>
    );
}