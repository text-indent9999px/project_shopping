import React, {ReactNode, HTMLProps, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { createPortal } from 'react-dom';
import './Dimmed.scss';
import {RootState} from "@/types/types";
import {dimmedCloseFunctionRemove, dimmedOpen} from "@/actions/actions";
import {enableScroll} from "@/function/Common";

interface DimmedProps extends HTMLProps<HTMLButtonElement> {
    children?: ReactNode;
}

const Dimmed: React.FC<DimmedProps> = ({ children, ...rest }) => {

    const dispatch = useDispatch();
    const dimmedRef = useRef(null);
    const isDimmedActive = useSelector((state: RootState) => state.dimmed.isActive);
    const dimmedFunction = useSelector((state:RootState) => state.dimmed.closeFunctions);

    const testFunction = () => {
        const condition = true;
        if (condition) {
            for (const key in dimmedFunction) {
                if (typeof dimmedFunction[key] === 'function') {
                    dimmedFunction[key]();
                }
            }
            dispatch(dimmedCloseFunctionRemove('all'));
            dispatch(dimmedOpen(false));
        }
    }

    useEffect(()=>{

    },[dimmedRef.current])

    return createPortal(
        <>
            {isDimmedActive && <div className="custom-dimmed" ref={dimmedRef} onClick={testFunction}></div>}
        </>,
        document.body
    );
};

export default Dimmed;