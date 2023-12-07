import React, { useRef, useState, useEffect, MutableRefObject } from "react";
import { createPortal } from "react-dom";
import './ScrollBar.scss';


interface GlobalScrollBarThumbProps {
    onRef: (ref: React.RefObject<HTMLDivElement>) => void;
    onMouseDown: (e: any) => void;
    onMouseMove: (e: any) => void;
    onMouseUp: (e: any) => void;
    onMouseLeave: (e: any) => void;
}

const GlobalScrollBarThumb: React.FC<GlobalScrollBarThumbProps> = ({ onRef, onMouseDown, onMouseMove, onMouseUp, onMouseLeave  }) => {
    const thumbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        onRef(thumbRef);
    }, [onRef, thumbRef]);

    return (
        <>
            <div className={"custom-page-scroll-thumb"} ref={thumbRef}
                 onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} onMouseUp={onMouseUp}></div>
        </>
    );
};

export default function GlobalCustomScrollBar() {
    const thumbRef = useRef<HTMLDivElement>(null);
    const [flag, setFlag] = useState(false);
    const pageHeight = useRef<number | null>(null);
    const [windowHeight, setWindowHeight] = useState(0);
    const [scrollCheck, setScrollCheck] = useState(false);
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        setFlag(true);
    }, []);

    useEffect(() => {
        if(thumbRef.current !== null){
            const observer = new ResizeObserver((entries, observer) => {
                for (const entry of entries) {
                    pageHeight.current = document.documentElement.offsetHeight;
                    setWindowHeight(window.innerHeight);
                }
            });
            observer.observe(document.documentElement);
            return () => {
                observer.disconnect();
            };
        }
    }, [thumbRef.current]);

    useEffect(() => {
        if(thumbRef.current !== null && pageHeight.current !== null){
            if (windowHeight >= pageHeight.current) return;

            let thumbHeight = (windowHeight / pageHeight.current) * windowHeight;
            thumbRef.current.style.height = thumbHeight + 'px';

            let scrollCheckTimeout: NodeJS.Timeout;

            const calculateThumbY = () => {
                if(thumbRef.current !== null && pageHeight.current !== null) {
                    const {scrollY} = window;
                    const scrollYFactor =
                        (pageHeight.current - thumbHeight) / (pageHeight.current - windowHeight);
                    const maxThumbScrollY = pageHeight.current - thumbHeight;
                    const thumbScrollY = scrollY * scrollYFactor;
                    const revisedThumbScrollY = thumbScrollY < 0 ? 0 : thumbScrollY;
                    thumbRef.current.style.transform = `translateY(${
                        revisedThumbScrollY > maxThumbScrollY
                            ? maxThumbScrollY
                            : revisedThumbScrollY
                    }px)`;

                    if (!scrollCheck) {
                        setScrollCheck(true);
                        thumbRef.current.classList.add('is-scrolling');
                    }
                    clearTimeout(scrollCheckTimeout);
                    scrollCheckTimeout = setTimeout(() => {
                        setScrollCheck(false);
                        if(thumbRef.current !== null){
                            thumbRef.current.classList.remove('is-scrolling');
                        }
                    }, 1000);
                }
            }

            document.addEventListener("scroll", calculateThumbY);
            return () => {
                document.removeEventListener("scroll", calculateThumbY);
            };
        }
    }, [windowHeight]);

    const handleRef = (ref: React.RefObject<HTMLDivElement>) => {
        // @ts-ignore
        thumbRef.current = ref.current;
    };


    const handleMouseDown = (e:any) => {
        setDragging(true);
    };

    const handleMouseUp = (e:any) => {
        setDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {

    };

    if (flag) {
        return createPortal(
            <GlobalScrollBarThumb onRef={handleRef}
                                  onMouseDown={handleMouseDown}
                                  onMouseMove={handleMouseMove}
                                  onMouseUp={handleMouseUp}
                                  onMouseLeave={handleMouseUp} />,
            document.body
        );
    }

    return null;
}