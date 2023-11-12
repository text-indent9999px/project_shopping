import React, {useContext, useState, useEffect, useRef} from 'react';
import BasicLayout from '../components/layout/BasicLayout';

import Link from "next/link";
import '../styles/pages-main.scss';
import Product1 from "@/components/product/Product1";
import {useSelector} from "react-redux";
import {AppState, ProductData} from "@/types/types";
import {calculateBrightness, intersectionObserve} from "@/function/Common";
import {get, onValue, ref} from "firebase/database";


const metadata = {
    title: 'Index Page',
    description: 'This is the test page',
};


export default function Index() {

    // @ts-ignore
    const productData = useSelector((state: ProductData) => state.product.product);

    // @ts-ignore
    const database = useSelector((state) => state.firebase.database);
    const productListRef = ref(database, 'product_list');
    const [testData, setTestData] = useState(null);
    const [testData2, setTestData2] = useState(null);

    useEffect(() => {
        onValue(productListRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setTestData(data.category['10']);
                setTestData2(data.category['11']);
                console.log('index data load complete');
            } else {
                console.log('No data available');
            }
        });
    }, []);

    const imgRef = useRef(null);

    useEffect(() => {
        const element = imgRef.current;
        intersectionObserve(element, calculateBrightness);
    }, []);

    return (
        <BasicLayout metadata={metadata}>
            <div className="main-banner-container" data-header-fixed="true">
                <ul className="main-banner-wrapper">
                    <li className="main-banner">
                        <Link href="/product/list">
                            <img src={`/images/main-img01.jpg`} alt="My Image" ref={imgRef} />
                            <div className="text-box">
                                <h3>신규 회원 이벤트 <br /> WELCOME</h3>
                                <p>지금 회원 가입하면 할인 쿠폰 지급!</p>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="main-prd-container main-section">
                <div className="main-title-box">
                    <h3>New Product</h3>
                    <p>신상품을 만나보세요.</p>
                </div>
                <div className="main-contents-box">
                    {testData && <Product1 data={testData} grid={4} output={4} page={1} pageSet={5} moreview={true} moreviewtype={'pagination'} sort={'new'}/>}
                </div>
            </div>
            <div className="main-prd-container2 main-section">
                <div className="main-title-box">
                    <h3>Best Product</h3>
                    <p>가장 인기있는 제품을 보여드려요.</p>
                </div>
                <div className="main-contents-box">
                    {testData2 && <Product1 data={testData2} grid={3} output={3} page={1} pageSet={5} moreview={true} moreviewtype={'pagination'} sort={'best'}/>}
                </div>
            </div>
        </BasicLayout>
    );
}