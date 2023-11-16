import React, {MouseEvent, ReactNode, useEffect, useRef} from 'react';
import { useSwiperSlide } from 'swiper/react';
import {checkAverageBright, findClosestParent} from "@/function/Common";
import {checkHeaderColor} from "@/actions/actions";
import {useDispatch} from "react-redux";

interface ColorCheckProps {
    children?: ReactNode,
}

const ColorCheckSwiper: React.FC<ColorCheckProps> = ({ children }) => {

    const swiperSlide = useSwiperSlide();
    const imgRef = useRef<HTMLElement | null>(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(imgRef.current){
            let $target = imgRef.current.childNodes[0] as HTMLImageElement;
            checkAverageBright($target);
            if(swiperSlide.isActive){
                const averageBrightness = $target.dataset.topBright;
                if(averageBrightness){
                    if(Number(averageBrightness) > 128){
                        dispatch(checkHeaderColor('bright'));
                    }else{
                        dispatch(checkHeaderColor('dark'));
                    }
                }
            }
        }
    },[swiperSlide.isActive, imgRef.current])


    return <>{
        React.cloneElement(
            children as React.ReactElement,
            { ref: imgRef }
        )
    }</>;

};

export default ColorCheckSwiper;