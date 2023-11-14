import React, {useEffect} from "react";
import BasicLayout from '@/components/layout/BasicLayout';
const metadata = {
    title: 'Basket Page',
    description: 'This is the test page',
};
import FixedFollowLayout from "@/components/layout/FixedFollowLayout";
import {useRouter} from "next/router";
import Product2 from "@/components/product/Product2";
import {useSelector} from "react-redux";
import {RootState} from "@/types/types";

export default function OrderBasket() {

    const router = useRouter();
    const productData = useSelector((state:RootState) => state.product.basket);

    useEffect(() => {

    }, []);


    return (
        <BasicLayout metadata={metadata}>
            <FixedFollowLayout>
                <>
                    <div className="basket-sidebar-products">
                        {productData.length > 0 && <Product2 data={productData} grid={1} output={12} page={1} pageSet={5} moreview={true} moreviewtype={'pagination'}/>}
                        {productData.length == 0 && <div className={`custom-empty-message`}>장바구니에 담긴 상품이 없습니다.</div>}
                    </div>
                </>
                <>
                    으아아

                </>
            </FixedFollowLayout>
        </BasicLayout>
    );
}