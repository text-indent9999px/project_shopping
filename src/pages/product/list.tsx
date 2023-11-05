import React, {useRef, useEffect, useState} from "react";
import BasicLayout from '@/components/layout/BasicLayout';
import Link from "next/link";
import Product1 from "@/components/product/Product1";
import {useSelector} from "react-redux";
import {AppState, ProductData} from "@/types/types";
import '../../styles/pages-prdList.scss';
import {intersectionObserve, calculateBrightness} from "@/function/Common";
import {useDispatch} from "react-redux";
import {Prefix} from "@/config/config";

const metadata = {
    title: 'Prd List Page',
    description: 'This is the test page',
};

interface LayoutProps {
    children: React.ReactNode;
}

const PrdList: React.FC<LayoutProps> = ({ children }) => {

    // @ts-ignore
    const productData = useSelector((state) => state.product.product);

    const imgRef = useRef(null);

    useEffect(() => {
        const element = imgRef.current;
        intersectionObserve(element, calculateBrightness);
    }, []);

    return (
        <BasicLayout metadata={metadata}>
            <div className="custom-page-banner-wrap" data-header-fixed="true">
                <ul className="custom-page-banners">
                    <li className="custom-page-banner">
                        <div className={`custom-page-title-box`}>
                            <h3>카테고리 이름</h3>
                            <p>카테고리 설명</p>
                        </div>
                        <img
                            ref={imgRef}
                            src={`${Prefix}/images/prdList-banner01.jpg`}
                            alt="My Image"
                        />
                    </li>
                </ul>
            </div>

            <div className="custom-page-product-list">
                <div className="custom-inner-basic">
                    {/*<div className={`custom-page-product-actions`}>*/}
                    {/*    <div className={`custom-page-product-sort`}>*/}
                    {/*        <select>*/}
                    {/*            <option>Test</option>*/}
                    {/*        </select>*/}
                    {/*    </div>*/}
                    {/*    <div className={`custom-page-product-grid`}>*/}
                    {/*        <ul>*/}
                    {/*            <li>1열</li>*/}
                    {/*            <li>2열</li>*/}
                    {/*            <li>3열</li>*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <Product1 data={productData} grid={3} output={9} page={1} pageSet={5} moreview={true} moreviewtype={'pagination'} sort={'basic'}/>
                </div>
            </div>

        </BasicLayout>
    );
}

export default PrdList;