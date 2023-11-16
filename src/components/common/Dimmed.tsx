import React, { ReactNode, HTMLProps, MouseEvent } from 'react';
import {useSelector} from "react-redux";

interface DimmedProps extends HTMLProps<HTMLButtonElement> {
    children?: ReactNode;
}

const Dimmed: React.FC<DimmedProps> = ({ children, ...rest }) => {

    //const isHeaderColor = useSelector((state) => state.check_header.isHeaderColor);

    return (
        <div className="custom-dimmed"></div>
    );
};

export default Dimmed;