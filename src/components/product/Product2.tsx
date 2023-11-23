import React, {useState} from "react";
import Link from "next/link";
import './Product.scss';
import Pagination from "@/components/pagination/pagination";
import Button from "@/components/button/Button";
import PriceList from "@/components/common/PriceList";
import Qty from "@/components/product/Qty";
import ButtonArea from "@/components/button/ButtonArea";
import {BasketData} from "@/types/types";
import {modifyToBasketData} from "@/actions/actions";
import {useDispatch} from "react-redux";
import {deleteToCart} from "@/function/Common";
import ProductSelect from "@/components/product/ProductSelect";
import InputBox from "@/components/input/InputBox";

interface Product2Props {
    onSelectItems: (item:Record<string, boolean>) => void;
    selectedItems: Record<string, boolean>,
    data: BasketData[];
    grid: number,
    output: number,
    page: number,
    moreview: boolean,
    moreviewtype: string,
    pageSet: number,
}

const Product2: React.FC<Product2Props> = (
    { onSelectItems, selectedItems, data = [],grid = 2, output = 3, page = 1, moreview = false, moreviewtype = 'pagination',
    pageSet = 5}) => {

    const dispatch = useDispatch();
    const [chkpage, setchkPage] = useState(page);

    const handleCheckboxChange = (optionCode: string) => {
        let coptyItems = {...selectedItems};
        coptyItems[optionCode] = ! coptyItems[optionCode];
        onSelectItems(coptyItems);
    };

    const handlePageChange = (newPage:number) => {
        setchkPage(newPage);
    };
    const handleAmountChange = (item:object, newAmount:number) => {
        if ('qty_num' in item) {
            let newData = { ...item, qty_num: newAmount };
            dispatch(modifyToBasketData(newData));
        }
    };

    const handleDelete = (item:object) => {
        let newData = Object.assign({}, item);
        //dispatch(deleteToBasketData(newData));
        deleteToCart(newData);
    };

    const handleModify = (e:React.MouseEvent) => {
        let clickedElement: Element | null = e.target as Element;
        let closestLi = findClosestLi(clickedElement);

        if (closestLi) {
            const optionSelectElement:Element|null = closestLi.querySelector('.option-change-area');
            if(optionSelectElement){
                if(optionSelectElement.classList.contains('is-active')){
                    optionSelectElement.classList.remove('is-active');
                    clickedElement.classList.remove('is-active');
                }else{
                    optionSelectElement.classList.add('is-active');
                    clickedElement.classList.add('is-active');
                }
            }
        }
        function findClosestLi(element: Element | null) {
            while (element !== null && element.tagName !== 'LI') {
                element = element.parentNode as Element | null;
            }
            return element;
        }
    }


    function renderProductItems(data: BasketData[]): JSX.Element | null {
        const dataLength = data.length;
        const start = ((chkpage - 1)*output);
        const end = (chkpage*output);
        const productItems = data.slice(start,end);

        if (productItems.length === 0) return null;

        return (
            <>
                <div className={`product-item-list product-item-list2`}>
                    <ul className={`product-items product-items2 grid-${grid}`}>
                        {productItems.map((item) => {
                            return (
                                <li
                                    key={item.option_select.option_code}
                                    className={`product-item product-item2 product-item_${item.option_select.option_code}`}>
                                    <div className={"chk-area"}>
                                        <InputBox type={"checkbox"}
                                                  checked={selectedItems[item.option_select.option_code]}
                                                  onChange={() => handleCheckboxChange(item.option_select.option_code)}
                                        ></InputBox>
                                    </div>
                                    <div className="img-area">
                                        <Link href={`/product/detail?product_no=${item.product_no}`}>
                                            <div className="img-box">
                                                <img src={item.image_main} alt={item.name} loading="lazy" />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="info-area">
                                        {/*<div className="review-box">*/}
                                        {/*    <Button className="review" data-type={'text'} width={'xs'}>*/}
                                        {/*        <b>리뷰 <CurrencyDisplay amount={item.review_count} />개</b>*/}
                                        {/*    </Button>*/}
                                        {/*</div>*/}
                                        <Link href={`/product/detail?product_no=${item.product_no}`}>
                                            <div className="hash-box">
                                                {item.hash_tag.map((item) => {
                                                    return (
                                                        <span key={item}>
                                                    {'#' + item}
                                                </span>
                                                    );
                                                })}
                                            </div>
                                            <div className="text-box">
                                                <strong className="name">{item.name}</strong>
                                                <p className="desc">{item.option_select.option_name}</p>
                                            </div>
                                            <div className="price-box">
                                                <PriceList price1={(item.retail_price)*item.qty_num + (item.option_select.option_value*item.qty_num)} price2={(item.sell_price)*item.qty_num + (item.option_select.option_value*item.qty_num)} price3={(item.sale_price)*item.qty_num + (item.option_select.option_value*item.qty_num)}>.</PriceList>
                                            </div>
                                        </Link>
                                        <div className="qty-box">
                                            <Qty value={item.qty_num} onAmountChange={(newAmount) => handleAmountChange(item, newAmount)}/>
                                        </div>
                                        <div className="action-box">
                                            <ButtonArea className={''} column-gap={'small'}>
                                                <Button className="review" data-type={'textButton'} width={'xs'} onClick={()=> handleDelete(item)}>
                                                    옵션삭제
                                                </Button>
                                                <Button className="review" data-type={'textButton'} width={'xs'} onClick={(e)=> handleModify(e)}>
                                                    옵션변경
                                                </Button>
                                            </ButtonArea>
                                        </div>
                                    </div>
                                    <div className={"option-change-area"}>
                                        <ProductSelect productData={item} type={'optionChange'}></ProductSelect>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>

                {moreview && moreviewtype === 'pagination' && <Pagination current={chkpage} output={output} length={dataLength} pageSet={pageSet} onPageChange={handlePageChange}/>}
                {moreview && moreviewtype === 'button' && <div> test2 </div>}
            </>
        );
    }

    return (
        <>
            {renderProductItems(data)}
        </>
    );
};

export default Product2;