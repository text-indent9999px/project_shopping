import React, { ReactNode, HTMLProps, MouseEvent } from 'react';

interface CurrencyDisplayProps extends HTMLProps<HTMLButtonElement> {
    amount: number,
}

const CurrencyDisplay: React.FC<CurrencyDisplayProps> = ({ amount = 0 }) => {
    const formattedAmount = amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return (
        <>{formattedAmount}</>
    );
};

export default CurrencyDisplay;