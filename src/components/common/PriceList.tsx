import React, { ReactNode, HTMLProps, MouseEvent } from 'react';
import CurrencyDisplay from "@/components/common/CurrencyDisplay";

interface PriceListProps extends HTMLProps<HTMLButtonElement> {
    children: ReactNode,
    [key: string]: any;
}

const PriceList: React.FC<PriceListProps> = ({ children, ...rest }) => {

    const priceArray:number[] = [];
    Object.keys(rest).forEach(function(key){
        if(key.indexOf('price')>-1){
            priceArray.push(rest[key]);
        }
    })

    const min = Math.min(...priceArray);
    const max = Math.max(...priceArray);
    const percent =  Math.round(((max - min) / max) * 100);

    return (
        <div className="custom-price-area">
            <ul className="custom-prices">
                {percent !== 0 && <li className="custom-price sale-percent">
                    {`${percent}%`}
                </li>}
                {max > min && <li className="custom-price strike-mark">
                    <CurrencyDisplay amount={max} />
                </li>}
                <li className="custom-price">
                    <CurrencyDisplay amount={min} />
                </li>
            </ul>
        </div>
    );
};

export default PriceList;