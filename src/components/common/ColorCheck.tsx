import React, {HTMLProps, useRef} from 'react';
import {checkHeaderColor} from "@/actions/actions";
import {useDispatch} from "react-redux";
import {checkAverageBright} from "@/function/Common";

interface ColorCheckProps extends HTMLProps<HTMLButtonElement> {
    imgSrc: string,
    alt: string,
}

const ColorCheck: React.FC<ColorCheckProps> = ({ imgSrc, alt }) => {

    const imgRef = useRef<HTMLImageElement>(null);
    const dispatch = useDispatch();

    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
    };
    const callback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                let $target = entry.target as HTMLImageElement;
                const averageBrightness = $target.dataset.topBright;
                if(averageBrightness){
                    if(Number(averageBrightness) > 128){
                        dispatch(checkHeaderColor('bright'));
                    }else{
                        dispatch(checkHeaderColor('dark'));
                    }
                }
            }
        });
    };

    const testHandler = () => {
        if (imgRef.current) {
          checkAverageBright(imgRef.current);
          const imgElement = imgRef.current;
          const observer = new IntersectionObserver(callback, options);
          observer.observe(imgElement);
          return () => {}
              observer.disconnect();
          };
    }

    return (
        <>
            <img src={imgSrc} alt={alt} ref={imgRef} onLoad={testHandler} crossOrigin={"anonymous"}/>
        </>
    );
};

export default ColorCheck;