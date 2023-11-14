import React, {useEffect, useState} from 'react';
import './BasketControl.scss';
import Product2 from "@/components/product/Product2";
import {useSelector} from "react-redux";
import {BasketData, RootState} from "@/types/types";
import Button from "@/components/button/Button";
import {deleteAllToCart, deleteSelectedItemsToCart} from "@/function/Common";
import ButtonArea from "@/components/button/ButtonArea";
import InputBox from "@/components/input/InputBox";
import ScrollBar from "@/components/scroll/ScrollBar";

interface summaryData {
    productAmount: number,
    discountAmount: number,
    deliveryAmount: number,
    totalAmount: number,
    totalAmountExceptDelivery: number,
}

interface LayoutProps {
    onSummaryDataSet?: (data: summaryData) => void;
    grid?: number,
    output?: number,
    page?: number,
    pageSet?: number,
    moreview?: boolean,
    moreviewtype?: string,
}

const BasketControl: React.FC<LayoutProps> = ({onSummaryDataSet, grid = 1, output=3, page=1, pageSet= 5, moreview= true, moreviewtype = 'pagination'}) => {
    const productData = useSelector((state:RootState) => state.product.basket);
    const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>({});
    const [checkedItmes, setCheckedItmes] = useState<string[]>([]);

    useEffect(() => {
        chkAllItems(true);
    }, [productData]);

    useEffect(() => {
        if(typeof onSummaryDataSet == "function"){
            let newSummary = {productAmount: 0, discountAmount: 0, deliveryAmount: 0, totalAmount: 0, totalAmountExceptDelivery: 0};
            productData.forEach(function(e){
                const chk = checkedItmes.some((item:string) => item == e.option_select.option_code);
                if(chk){
                    newSummary["productAmount"] += (e.retail_price + e.option_select.option_value) * e.qty_num;
                    newSummary["discountAmount"] += (((e.retail_price + e.option_select.option_value) * e.qty_num) - ((e.sale_price + e.option_select.option_value) * e.qty_num));
                    newSummary["totalAmountExceptDelivery"] += ((e.sale_price + e.option_select.option_value) * e.qty_num);
                    newSummary["deliveryAmount"] = newSummary["totalAmountExceptDelivery"] < 50000 ? 3000 : 0;
                    newSummary["totalAmount"] = newSummary["totalAmountExceptDelivery"] + newSummary["deliveryAmount"];
                }
            });
            onSummaryDataSet(newSummary);
        }
    }, [checkedItmes])

    const chkAllHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let $input = e.target as HTMLInputElement;
        if ($input.checked) {
            chkAllItems(true);
        } else {
            chkAllItems(false);
        }
    }

    const chkAllItems = (boo: boolean) => {
        const initialSelectedItems = productData.reduce((acc, product) => {
            acc[product.option_select.option_code] = boo;
            return acc;
        }, {} as Record<string, boolean>);
        setSelectedItems(initialSelectedItems);
        if(boo){
            const checkedItemArray:string[] = productData.reduce((acc:string[], product) => {
                acc.push(product.option_select.option_code);
                return acc;
            }, []);
            setCheckedItmes(checkedItemArray);
        }else{
            setCheckedItmes([]);
        }
    }

    const onSelectItems = (items: Record<string, boolean>) => {
        const checkedItemArray = Object.keys(items).reduce((acc:string[], item) => {
            if(items[item]){
                acc.push(item);
            }
            return acc;
        }, []);
        setCheckedItmes(checkedItemArray);
        setSelectedItems(items);
    };

    return (
        <>
            <div className="custom-basket-actions">
                <InputBox className="chk-all" type={"checkbox"}
                          onChange={(e) => chkAllHandler(e)}
                          checked={checkedItmes.length == productData.length ? true : false}>
                    {productData.length > 0 && <span className={"basket-data-count"}>{`총 ${checkedItmes.length}/${productData.length}개`}</span>}
                </InputBox>
                <ButtonArea>
                    <Button className={'empty'} width={'sm'} data-type={'textButton'} color={'color2'} onClick={()=> deleteSelectedItemsToCart(checkedItmes)} data-disabled={`${productData.length >= 1 ? '' : 'disabled'}`}>
                        선택 상품 삭제
                    </Button>
                    <Button className={'empty'} width={'sm'} data-type={'textButton'} color={'color2'} onClick={deleteAllToCart} data-disabled={`${productData.length >= 1 ? '' : 'disabled'}`}>
                        장바구니 비우기
                    </Button>
                </ButtonArea>
            </div>
            <div className="custom-basket-products">
                <ScrollBar>
                    {productData.length > 0 && <Product2 onSelectItems={onSelectItems} selectedItems={selectedItems} data={productData} grid={grid} output={output} page={page} pageSet={pageSet} moreview={moreview} moreviewtype={moreviewtype}/>}
                    {productData.length == 0 && <div className={`custom-empty-message`}>장바구니에 담긴 상품이 없습니다.</div>}
                </ScrollBar>
            </div>
        </>
    );
};

export default BasketControl;