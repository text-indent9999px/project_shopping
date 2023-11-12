import React, {useState, useRef} from "react";
import './Product.scss';
import './Qty.scss';
import Qty from "@/components/product/Qty";
import './AddProducts.scss';
import Button from "@/components/button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import CurrencyDisplay from "@/components/common/CurrencyDisplay";
import {modifyToBasketData} from "@/actions/actions";

interface AddProductProps {
    // value: number,
    // onAmountChange: (amount: number) => void;
    data: object,
    onDataChange : (type:string, modifyData:object) => void;
}

const AddProducts: React.FC<AddProductProps> = ({ data , onDataChange}) => {

    const handleAmountChange = (item:object, newAmount:number) => {
        if ('qty_num' in item) {
            let modifyData = { ...item, qty_num: newAmount };
            onDataChange('modify', modifyData);
        }
    };

    const handleDelete = (item) => {
        onDataChange('delete', item);
    }

    if(data.length > 0){
        return (
            <>
                <div className={"custom-add-products-container"}>
                    <ul>
                        {data ? data.map((item) => {
                            if (item) {
                                return (
                                    <li key={item.option_select.option_code}>
                                        <p>{item.name}</p>
                                        <span>{item.option_select.option_name}</span>
                                        <p><CurrencyDisplay amount={(item.sale_price + item.option_select.option_value)*item.qty_num}/>{` (${(item.option_select.option_value)*item.qty_num})`}</p>
                                        <Qty value={item.qty_num} onAmountChange={(newAmount) => handleAmountChange(item, newAmount)}/>
                                        <Button className={'close'} width={'sm'} data-type={'icon'} onClick={(e)=>handleDelete(item)}>
                                            <FontAwesomeIcon icon={faClose} />
                                        </Button>
                                    </li>
                                );
                            }
                        }) : ''}
                    </ul>
                </div>
            </>
        );
    }
};

export default AddProducts;