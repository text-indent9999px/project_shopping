import React, {useEffect, useState} from "react";
import '../../styles/pages-orderBasket.scss';
import BasicLayout from '@/components/layout/BasicLayout';
const metadata = {
    title: 'Basket Page',
    description: 'This is the test page',
};
import FixedFollowLayout from "@/components/layout/FixedFollowLayout";
import ButtonArea from "@/components/button/ButtonArea";
import Button from "@/components/button/Button";
import BasketControl from "@/components/basket/BasketControl";
import Title from "@/components/page/Title";
import CurrencyDisplay from "@/components/common/CurrencyDisplay";
import {useSelector} from "react-redux";
import {RootState} from "@/types/types";

interface summaryData {
    productAmount: number,
    discountAmount: number,
    deliveryAmount: number,
    totalAmount: number,
    totalAmountExceptDelivery: number,
}

export default function OrderBasket() {

    const deviceCheck = useSelector((state:RootState) => state.browser.device);
    const [summaryData, setSummaryData] = useState<summaryData | null>(null);

    const onSummaryDataSet = (data: summaryData) => {
        setSummaryData(data);
    }

    return (
        <BasicLayout metadata={metadata}>
            <Title title={"장바구니"} desc={""}></Title>

            {deviceCheck == 'PC' ? <FixedFollowLayout>
                <>
                    <BasketControl onSummaryDataSet={onSummaryDataSet} grid={1} output={999} moreview={false}></BasketControl>
                </>
                <>
                    <div className={"custom-summary-area"}>
                        <div className={"custom-summary"}>
                            <ul>
                                <li>
                                    <strong className={"title"}>총 상품 금액</strong>
                                    <div className={"desc"}><CurrencyDisplay amount={summaryData?.productAmount || 0} /></div>
                                </li>
                                <li>
                                    <strong className={"title"}>총 할인 금액</strong>
                                    <div className={"desc"}><CurrencyDisplay amount={summaryData?.discountAmount || 0} /></div>
                                </li>
                                <li>
                                    <strong className={"title"}>총 배송 금액</strong>
                                    <div className={"desc"}><CurrencyDisplay amount={summaryData?.deliveryAmount || 0} /></div>
                                </li>
                                <li className={"total"}>
                                    <strong className={"title"}>총 주문 금액</strong>
                                    <div className={"desc"}><CurrencyDisplay amount={summaryData?.totalAmount || 0} /></div>
                                </li>
                            </ul>
                        </div>

                        <div className={"custom-basket-action-box"}>
                            <ButtonArea className={'width-full'} width={'full'}>
                                <Button color={'color2'} width={'lg'} data-type={'textButton'}>주문하기</Button>
                            </ButtonArea>
                        </div>
                    </div>
                </>
            </FixedFollowLayout> : <>
                <BasketControl onSummaryDataSet={onSummaryDataSet} grid={1} output={999} moreview={false}></BasketControl>
                <div className={"custom-summary-area"}>
                    <div className={"custom-summary"}>
                        <ul>
                            <li>
                                <strong className={"title"}>총 상품 금액</strong>
                                <div className={"desc"}><CurrencyDisplay amount={summaryData?.productAmount || 0} /></div>
                            </li>
                            <li>
                                <strong className={"title"}>총 할인 금액</strong>
                                <div className={"desc"}><CurrencyDisplay amount={summaryData?.discountAmount || 0} /></div>
                            </li>
                            <li>
                                <strong className={"title"}>총 배송 금액</strong>
                                <div className={"desc"}><CurrencyDisplay amount={summaryData?.deliveryAmount || 0} /></div>
                            </li>
                            <li className={"total"}>
                                <strong className={"title"}>총 주문 금액</strong>
                                <div className={"desc"}><CurrencyDisplay amount={summaryData?.totalAmount || 0} /></div>
                            </li>
                        </ul>
                    </div>
                    <div className={"custom-basket-action-box"}>
                        <ButtonArea className={'width-full'} width={'full'}>
                            <Button color={'color2'} width={'lg'} data-type={'textButton'}>주문하기</Button>
                        </ButtonArea>
                    </div>
                </div>
            </>}



        </BasicLayout>
    );
}