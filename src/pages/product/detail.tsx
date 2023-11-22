import React, {useRef, useEffect, useState} from "react";
import BasicLayout from '@/components/layout/BasicLayout';
import {useSelector} from "react-redux";
import {ProductData, RootState} from "@/types/types";
const metadata = {
    title: 'Prd Detail Page',
    description: 'This is the test page',
};
import {get, ref} from "firebase/database";
import FixedFollowLayout from "@/components/layout/FixedFollowLayout";
import FixedFollowLayout2 from "@/components/layout/FixedFollowLayout2";
import '../../styles/pages-prdDetail.scss';
import PriceList from "@/components/common/PriceList";
import {useRouter} from "next/router";
import CurrencyDisplay from "@/components/common/CurrencyDisplay";
import ProductSelect from "@/components/product/ProductSelect";
import ButtonArea from "@/components/button/ButtonArea";
import Button from "@/components/button/Button";
import Image from "next/image";

export default function PrdDetail() {

    const deviceCheck = useSelector((state:RootState) => state.browser.device);
    const router = useRouter();
    const { product_no } = router.query;
    const database = useSelector((state:RootState) => state.firebase.database);
    const productRef = ref(database, 'product_list/all');
    const [productData, setProductData] = useState<ProductData | null>(null);

    useEffect(() => {
        get(productRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    let productItem = data.filter(function(e:ProductData){
                        if(e.product_no == Number(product_no)){
                            return true;
                        }
                    })[0];
                    setProductData(productItem);
                } else {
                    //console.log('No data available');
                }
            })
            .catch((error) => {
                //console.error('Error reading data from the database:', error);
            });
    }, [product_no]);


    const part1 = () => {
        return (
            <>
                <div className={"custom-detail-img-area"}>
                    <div className={'custom-detail-img-box'}>
                        <img src={productData?.image_main ?? ''} alt="" />
                    </div>
                </div>
            </>
        );
    }

    const part2 = () => {
        return (
          <>
              <div className={"custom-detail-info-box"}>
                  <ul>
                      <li className="custom-info-item custom-info-hash">
                          <strong>해시태그</strong>
                          <div>
                              {productData ? productData.hash_tag.map((item) => {
                                  if (item) {
                                      return (
                                          <span key={item}>{'#'+item}</span>
                                      );
                                  }
                              }) : ''}
                          </div>
                      </li>
                      <li className="custom-info-item custom-info-name">
                          <strong>상품명</strong>
                          <div>{productData ? productData.name : ''}</div>
                      </li>
                      <li className={"custom-info-item"}>
                          <strong>가격</strong>
                          <div>
                              <PriceList price1={productData ? productData.retail_price : ''} price2={productData ? productData.sell_price : ''} price3={productData ? productData.sale_price : ''}>.</PriceList>
                          </div>
                      </li>
                  </ul>
                  <ul>
                      <li className="custom-info-item">
                          <strong>배송비</strong>
                          <div><CurrencyDisplay amount={productData ? productData.shipping_fee : 0} /></div>
                      </li>
                      <li className="custom-info-item">
                          <strong>상품 설명</strong>
                          <div>{productData ? productData.summary_desc : ''}</div>
                      </li>
                  </ul>
              </div>
          </>
        );
    }

    const part3 = () => {
        return(
            <>{productData ? <ProductSelect productData={productData} type={'optionSelect'} /> : null}</>
        );
    }


    const part4 = () => {
        return(
            <ButtonArea className={'width-full'} width={'full'}>
                <Button color={'color1'} width={'lg'} data-type={'textButton'}>장바구니 담기</Button>
            </ButtonArea>
        )
    }

    const part5 = () => {
        return(
            <>
                <div className={"custom-detail-desc-area"}>
                    <div className={'custom-detail-desc-box'}>
                        <Image src={"/images/prd-detail-img01.jpg"} alt={"dummy"} layout="responsive" width={853} height={1280}/>
                        <Image src={"/images/prd-detail-img01.jpg"} alt={"dummy"} layout="responsive" width={853} height={1280}/>
                        <Image src={"/images/prd-detail-img01.jpg"} alt={"dummy"} layout="responsive" width={853} height={1280}/>
                    </div>
                </div>
            </>
        )
    }


    return (
        <BasicLayout metadata={metadata}>
            {deviceCheck == 'PC' ?
                <FixedFollowLayout>
                    <>
                        {part1()}
                        {part5()}
                    </>
                    <>
                        {part2()}
                        {part3()}
                    </>
                </FixedFollowLayout>
            :
                <FixedFollowLayout2>
                    <>
                        {part1()}
                        {part2()}
                        {part5()}
                    </>
                    <>
                        {part2()}
                        {part3()}
                    </>
                    <>
                        {part4()}
                    </>
                </FixedFollowLayout2>
            }
        </BasicLayout>
    );
}