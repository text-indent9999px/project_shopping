import React, {useRef, useEffect, useState, HTMLProps} from "react";
import '../../styles/pages-prdDetail.scss';
import ButtonArea from "@/components/button/ButtonArea";
import Button from "@/components/button/Button";
import AddProducts from "@/components/product/AddProducts";
import Select from 'react-select';
import {addToCart, isEmptyAddOptionList} from "@/function/Common";
import store from "@/store/store";
import {addToBasketData, changeToBasketData, deleteToBasketData} from "@/actions/actions";
import {Option, ProductData} from "@/types/types";

interface ProductSelectProps extends HTMLProps<HTMLButtonElement> {
    productData: ProductData,
    type: string,
}


const ProductSelect: React.FC<ProductSelectProps> = ({ productData, type }) => {

    const [addOptionData, setAddOptionData] = useState([]);
    const [productOption, setProductOption] = useState([]);

    useEffect(() => {
        let testArray:any = [];
        productData.option.map((e:Option)=>{
            let testItem:{value: string, label: string} = {
                value : e.option_code,
                label : e.option_name,
            }
            testArray.push(testItem);
        })
        setProductOption(testArray);
    }, []);

    const addOptionOnChangeHandler = (selectValue:{value: string, label: string} | null) => {
        if(selectValue){
            let newProductData:ProductData = Object.assign(productData, {});
            let totalValue:Option = newProductData.option.filter((e:Option)=>{
                if(e.option_code === selectValue.value){
                    return true;
                }
            })[0];
            newProductData = {...newProductData, option_select: totalValue, qty_num: 1};
            let chkData:ProductData[] = addOptionData.filter((item:ProductData)=>{
                if(item.option_select === totalValue){
                    return true;
                }
            });
            let newAddOptionData:any = [];
            if(chkData.length > 0){
                newAddOptionData = addOptionData.map((item:ProductData) => {
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
        }
    };

    const addOptionChangeHandler = (type:string, modifyData:ProductData) => {
        let newAddOptionData:any = [];

        switch(type){
            case 'delete':
                newAddOptionData = addOptionData.filter((item:ProductData) => {
                    if (item.option_select.option_code !== modifyData.option_select.option_code) {
                        return item;
                    }
                });
                setAddOptionData(newAddOptionData);
                break;
            case 'modify' :
                newAddOptionData = addOptionData.map((item:ProductData) => {
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


    const addOptionOnChangeHandler2 = (selectValue:{value: string, label: string} | null) => {
        if(selectValue){
            let newProductData = Object.assign(productData, {});
            let totalValue = newProductData.option.filter((e:any)=>{
                if(e.option_code === selectValue.value){
                    return true;
                }
            })[0];
            newProductData = {...newProductData, option_select: totalValue};
            store.dispatch(changeToBasketData({before: productData, after: newProductData}));
        }
    }

    return (
        <>
            <div className={"custom-detail-option-box"}>
                {productData && <Select key={Math.random()}
                                        options={productOption}
                                        isSearchable={false}
                                        className="react-select-container"
                                        classNamePrefix="react-select"
                                        placeholder={type == 'optionSelect' ? "원하는 옵션을 선택하세요" : "변경할 옵션을 선택하세요"}
                                        onChange={type == 'optionSelect' ? addOptionOnChangeHandler : addOptionOnChangeHandler2}
                ></Select>}
            </div>
            {type == 'optionSelect' && <>
                <AddProducts data={addOptionData} onDataChange={(type, modifyData) => addOptionChangeHandler(type, modifyData)}></AddProducts>
                <div className={"custom-detail-action-box"}>
                    <ButtonArea className={'width-full'} width={'full'}>
                        <Button color={'color1'} width={'lg'} data-type={'textButton'} onClick={(e) => addOptionData.length == 0 ? isEmptyAddOptionList() : addToCart(addOptionData, e)}>장바구니 담기</Button>
                        <Button color={'color2'} width={'lg'} data-type={'textButton'}>바로 구매하기</Button>
                    </ButtonArea>
                </div>
            </>}
        </>
    );
}

export default ProductSelect;