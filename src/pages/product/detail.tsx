import React, {useRef, useEffect, useState} from "react";
import BasicLayout from '@/components/layout/BasicLayout';
import Link from "next/link";
import Product1 from "@/components/product/Product1";
import {useSelector} from "react-redux";
import {AppState, ProductData} from "@/types/types";

const metadata = {
    title: 'Prd Detail Page',
    description: 'This is the test page',
};

import {get, getDatabase, onValue, ref, set} from "firebase/database";
import FixedFollowLayout from "@/components/layout/FixedFollowLayout";
import '../../styles/pages-prdDetail.scss';
import PriceList from "@/components/common/PriceList";
import ButtonArea from "@/components/button/ButtonArea";
import Button from "@/components/button/Button";
import AddProducts from "@/components/product/AddProducts";
import {useRouter} from "next/router";
import CurrencyDisplay from "@/components/common/CurrencyDisplay";
import Select from 'react-select';
import {addToCart} from "@/function/Common";

export default function PrdDetail() {

    const router = useRouter();
    const { product_no } = router.query;
    const database = useSelector((state) => state.firebase.database);
    const productRef = ref(database, 'product_list/all');
    const [productData, setProductData] = useState(null);
    const [addOptionData, setAddOptionData] = useState([]);
    const [productOption, setProductOption] = useState([]);

    useEffect(() => {
        get(productRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    let productItem = data.filter(function(e){
                        if(e.product_no == product_no){
                            return true;
                        }
                    })[0];
                    setProductData(productItem);
                    let testArray = [];
                    productItem.option.map((e)=>{
                        let testItem = {
                            value : e.option_code,
                            label : e.option_name,
                        }
                        testArray.push(testItem);
                    })
                    setProductOption(testArray);
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error('Error reading data from the database:', error);
            });
    }, [product_no]);

    const addOptionOnChangeHandler = (selectValue:object) => {
        let newProductData = Object.assign(productData, {});
        let totalValue = newProductData.option.filter((e)=>{
            if(e.option_code === selectValue.value){
                return true;
            }
        })[0];
        newProductData = {...newProductData, option_select: totalValue, qty_num: 1};
        let chkData = addOptionData.filter((item)=>{
            if(item.option_select === totalValue){
                return true;
            }
        });
        let newAddOptionData = [];
        if(chkData.length > 0){
            newAddOptionData = addOptionData.map(item => {
                if (item.option_select === totalValue) {
                    item.qty_num = item.qty_num + 1;
                    return item;
                }
                return item;
            });
        }else{
            newAddOptionData = [...addOptionData, newProductData];
        }
        setAddOptionData(newAddOptionData);
    };

    const addOptionChangeHandler = (type:string, modifyData:object) => {
        let newAddOptionData = [];

        switch(type){
            case 'delete':
                newAddOptionData = addOptionData.filter(item => {
                    if (item.option_select.option_code !== modifyData.option_select.option_code) {
                        return item;
                    }
                });
                setAddOptionData(newAddOptionData);
                break;
            case 'modify' :
                newAddOptionData = addOptionData.map(item => {
                    if (item.option_select.option_code === modifyData.option_select.option_code) {
                        return modifyData;
                    }
                    return item;
                });
                setAddOptionData(newAddOptionData);
                break;
            default:
                break;
        }
    }


    return (
        <BasicLayout metadata={metadata}>
            <FixedFollowLayout>
                <>
                    <div className={"custom-detail-img-area"}>
                        <div className={'custom-detail-img-box'}>
                            <img src={productData ? productData.image_main : ''} alt={""} />
                        </div>
                    </div>
                    <div className={"custom-detail-desc-area"}>
                        <div className={'custom-detail-desc-box'}>
                            <img src={"../images/prd-detail-img01.jpg"} alt={""} />
                            <img src={"../images/prd-detail-img01.jpg"} alt={""} />
                            <img src={"../images/prd-detail-img01.jpg"} alt={""} />
                        </div>
                    </div>
                </>
                <>
                    <div className={"custom-detail-info-box"}>
                        <ul>
                            <li className="custom-info-item custom-info-hash">
                                <strong>해시태그</strong>
                                <div>
                                    {productData ? productData.hash_tag.map((item) => {
                                        if (item) {
                                            return (
                                                '#'+item
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
                                <div><CurrencyDisplay amount={productData ? productData.shipping_fee : ''} /></div>
                            </li>
                            <li className="custom-info-item">
                                <strong>상품 설명</strong>
                                <div>{productData ? productData.summary_desc : ''}</div>
                            </li>
                        </ul>
                    </div>

                    <div className={"custom-detail-option-box"}>
                        {productData && <Select key={Math.random()}
                                                options={productOption}
                                                className="react-select-container"
                                                classNamePrefix="react-select"
                                                placeholder="원하는 옵션을 선택하세요"
                                                onChange={addOptionOnChangeHandler}
                        ></Select>}
                    </div>

                    <AddProducts data={addOptionData} onDataChange={(type, modifyData) => addOptionChangeHandler(type, modifyData)}></AddProducts>

                    <div className={"custom-detail-action-box"}>
                        <ButtonArea className={'width-full'} width={'full'}>
                            <Button color={'color1'} width={'lg'} data-type={'textButton'} onClick={(e) => addToCart(addOptionData, e)}>장바구니 담기</Button>
                            <Button color={'color2'} width={'lg'} data-type={'textButton'}>바로 구매하기</Button>
                        </ButtonArea>
                    </div>

                </>
            </FixedFollowLayout>
        </BasicLayout>
    );
}