import React, {useState, useRef} from "react";
import './Product.scss';
import Button from "@/components/button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faMinus} from "@fortawesome/free-solid-svg-icons";
import './Qty.scss';
import {setIn} from "immutable";

interface QtyProps {
    value: number,
    onAmountChange: (amount: number) => void;
}

const Qty: React.FC<QtyProps> = ({value= 1, onAmountChange}) => {

    const inputRef = useRef(null);

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        const numberPattern = /\d+/g;
        const numbers = input.match(numberPattern);
        let result = Number(numbers ? numbers.join('') : '');
        if(result < 0){
            result = 0;
        }else if(result > 99){
            result = 99;
        }
        onAmountChange(Number(result));
    }

    const handleAmountClick = (type:string) => {
        const inputTarget = inputRef.current;
        if(inputTarget){
            // @ts-ignore
            const value = Number(inputTarget.value);
            switch(type){
                case 'up':
                    if((value + 1) > 99){
                        //setInputValue(99);
                        onAmountChange(99);
                    }else{
                        //setInputValue((value + 1));
                        onAmountChange((value + 1));
                    }
                    break;
                case 'down':
                    if((value - 1) < 1){
                        //setInputValue(1);
                        onAmountChange(1);
                    }else{
                        onAmountChange((value - 1));
                    }
                    break;
                default:
                    break;
            }
        }
    }

    return (
        <>
            <div className="qty-container">
                <Button className={'down'} width={'sm'} data-type={'icon'} onClick={()=>handleAmountClick('down')}>
                    <FontAwesomeIcon icon={faMinus}></FontAwesomeIcon>
                </Button>
                <input ref={inputRef} type="text" value={value} onChange={handleAmountChange} />
                <Button className={'up'} width={'sm'} data-type={'icon'} onClick={()=>handleAmountClick('up')}>
                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                </Button>
            </div>
        </>
    );
};

export default Qty;