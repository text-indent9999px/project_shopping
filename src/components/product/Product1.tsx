import React, {useState, useContext, useRef, useEffect} from "react";
import Link from "next/link";
import './Product.scss';
import Pagination from "@/components/pagination/pagination";
import PriceList from "@/components/common/PriceList";
import {ProductData} from "@/types/types";
import LazyImg from "@/components/common/LazyImg";

interface Product1Props {
    data: ProductData[];
    grid: number,
    output: number,
    page: number,
    moreview: boolean,
    moreviewtype: string,
    pageSet: number,
    sort: string,
}

const Product1: React.FC<Product1Props> = (
    { data = [],grid = 2, output = 3, page = 1, moreview = false, moreviewtype = 'pagination',
    pageSet = 5, sort = 'basic'}) => {

    const [chkpage, setchkPage] = useState(page);
    const productListRef = useRef(null);

    useEffect(() => {
        setchkPage(1);
    }, [data])

    const handlePageChange = (newPage:number) => {
        setchkPage(newPage);
        if(productListRef.current){
            let $productList = productListRef.current as HTMLElement;
            let offsetTop = $productList.offsetTop;
            let $headerElement = document.querySelector('.header-container') as HTMLElement;
            window.scrollTo({
                top: offsetTop - $headerElement.clientHeight - 180,
                behavior: 'smooth'
            });
        }
    };

    switch (sort){
        case 'new' :
            data.sort((a, b) => new Date(b.update_date).getTime() - new Date(a.update_date).getTime());
            break;
        case 'old' :
            data.sort((a, b) => new Date(a.update_date).getTime() - new Date(b.update_date).getTime());
        case 'best' :
            data.sort((a, b) => b.hit_count - a.hit_count);
            break;
        case 'review' :
            data.sort((a, b) => b.review_count - a.review_count);
            break;
        case 'lower' :
            data.sort((a, b) => Number(a.sale_price) - Number(b.sale_price));
            break;
        case 'higher' :
            data.sort((a, b) => Number(b.sale_price) - Number(a.sale_price));
            break;
        default :
            break;
    }


    function renderProductItems(data: ProductData[]): JSX.Element | null {
        const dataLength = data.length;
        const start = ((chkpage - 1)*output);
        const end = (chkpage*output);
        const productItems = data.slice(start,end);
        if (productItems.length === 0) return null;

        return (
            <>
                <div className={`product-item-list`} ref={productListRef}>
                    <ul className={`product-items grid-${grid}`}>
                        {productItems.map((item) => (
                            <li
                                key={item.product_no}
                                className={`product-item product-item_${item.product_no}`}>
                                <div className="img-area">
                                    <Link href={`/product/detail?product_no=${item.product_no}`}>
                                        <div className="img-box">
                                            <LazyImg src={item.image_main} alt={item.name} lazy={true}></LazyImg>
                                        </div>
                                    </Link>
                                </div>
                                <div className="info-area">
                                    {/*<div className="review-box">*/}
                                    {/*    <Button className="review" data-type={'text'} width={'sm'}>*/}
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
                                            <p className="desc">{item.summary_desc}</p>
                                        </div>
                                        <div className="price-box">
                                            <PriceList price1={item.retail_price} price2={item.sell_price} price3={item.sale_price}>.</PriceList>
                                        </div>
                                    </Link>
                                    {/*<div className="action-box">*/}
                                    {/*    <Button className="cart" data-type={'icon'} width={'sm'} onClick={(e) => addToCart(item, e)}>*/}
                                    {/*        <FontAwesomeIcon icon={faCartShopping} />*/}
                                    {/*    </Button>*/}
                                    {/*</div>*/}
                                </div>
                            </li>
                        ))}
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

export default Product1;