import React, {useState, useContext} from "react";
import Link from "next/link";
import './Product.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import Pagination from "@/components/pagination/pagination";
import Button from "@/components/button/Button";
import CurrencyDisplay from "@/components/common/CurrencyDisplay";
import PriceList from "@/components/common/PriceList";
import Qty from "@/components/product/Qty";
import ButtonArea from "@/components/button/ButtonArea";
import {BasketData} from "@/types/types";
import {deleteToBasketData, modifyToBasketData} from "@/actions/actions";
import {useDispatch} from "react-redux";
import {deleteToCart} from "@/function/Common";

interface Product2Props {
    data: BasketData[];
    grid: number,
    output: number,
    page: number,
    moreview: boolean,
    moreviewtype: string,
    pageSet: number,
}

const Product2: React.FC<Product2Props> = (
    { data = [],grid = 2, output = 3, page = 1, moreview = false, moreviewtype = 'pagination',
    pageSet = 5}) => {

    const dispatch = useDispatch();

    const [chkpage, setchkPage] = useState(page);

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
                                    className={`product-item product-item2 product-item_${item.product_no}`}>
                                    <div className="img-area">
                                        <Link href={`/product/detail?product_no=${item.product_no}`}>
                                            <div className="img-box">
                                                <img src={item.image_main} alt={item.name} />
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="info-area">
                                        {/*<div className="review-box">*/}
                                        {/*    <Button className="review" data-type={'text'} width={'xs'}>*/}
                                        {/*        <b>리뷰 <CurrencyDisplay amount={item.review_count} />개</b>*/}
                                        {/*    </Button>*/}
                                        {/*</div>*/}
                                        <div className="hash-box">
                                            {item.hash_tag.map((item) => {
                                                return (
                                                    <span key={item}>
                                                    {'#' + item}
                                                </span>
                                                );
                                            })}
                                        </div>
                                        <Link href={`/product/detail?product_no=${item.product_no}`}>
                                            <div className="text-box">
                                                <strong className="name">{item.name}</strong>
                                                <p className="desc">{item.option_select.option_name}</p>
                                            </div>
                                            <div className="price-box">
                                                <PriceList price1={(item.retail_price)*item.qty_num} price2={(item.sell_price)*item.qty_num} price3={(item.sale_price)*item.qty_num}>.</PriceList>
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
                                                <Button className="review" data-type={'textButton'} width={'xs'}>
                                                    옵션변경
                                                </Button>
                                            </ButtonArea>
                                        </div>
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