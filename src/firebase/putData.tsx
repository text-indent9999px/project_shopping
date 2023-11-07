import { getDatabase, ref, set } from "firebase/database";
import {useSelector} from "react-redux";


const database = useSelector((state) => state.firebase.database);
const productListRef = ref(database, 'product_list/category/10');

const productData = [];

for (let i = 1; i <= 100; i++) {
    const retailPrice = Math.floor(Math.random() * 1000) + 1;
    const sellPrice = Math.floor(Math.random() * retailPrice) + 1;
    const salePrice = Math.floor(Math.random() * sellPrice) + 1;

    const randomTime = new Date(2023, 10, 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));

    productData.push({
        product_no: i,
        name: '상품명 ' + i,
        eng_name: 'english name ' + i,
        image_main: `https://firebasestorage.googleapis.com/v0/b/projectshopping-ec984.appspot.com/o/product%2Fprd-img${i.toString().padStart(3, '0')}.jpg?alt=media&token=01f6a147-5825-4720-bd16-34b481eefc3a`,
        retail_price: retailPrice,
        sell_price: sellPrice,
        sale_price: salePrice,
        summary_desc: '상품 설명 ' + i,
        review_count: Math.floor(Math.random() * 100),
        update_date: randomTime.toISOString(),
        hit_count: Math.floor(Math.random() * 100)
    });
}


// 제품 데이터를 Firebase Realtime Database에 추가
// set(productListRef, productsData)
//     .then(() => {
//         console.log("Products data added to the database.");
//     })
//     .catch((error) => {
//         console.error("Error adding products data to the database:", error);
//     });