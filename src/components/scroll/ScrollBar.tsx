import React, {useRef, useState, useEffect} from 'react';
import './ScrollBar.scss';
import {clearInterval} from "timers";

interface LayoutProps {
    children: React.ReactNode,
}

const ScrollBar: React.FC<LayoutProps> = ({ children }) => {

    const scrollContainer = useRef<HTMLDivElement | null>(null);
    const [scrollCheck, setScrollCheck] = useState(false);

    useEffect(() => {
        if(scrollContainer.current != null){


            const scrollElement = scrollContainer.current;
            const parentElement = scrollContainer.current.parentElement;
            const standardElement = parentElement.parentElement;
            const contentsElement = scrollContainer.current.children[0];
            const thumbElement = parentElement.children[1];


            if(parentElement !== null && contentsElement !== null && thumbElement !== null){

                const standardComputedStyle = getComputedStyle(standardElement);
                const standardMaxHeight = Math.max(parseFloat(standardComputedStyle.maxHeight), standardElement.clientHeight);
                const standardPaddingTop = parseFloat(standardComputedStyle.paddingTop);
                const standardPaddingBottom = parseFloat(standardComputedStyle.paddingBottom);
                const standardBorderWidth = parseFloat(standardComputedStyle.borderWidth);
                const standardScrollContentMaxInnerHeight = standardMaxHeight - standardPaddingBottom - standardPaddingTop - (2*standardBorderWidth);

                parentElement.style.maxHeight = standardScrollContentMaxInnerHeight + 'px';

                const observer = new ResizeObserver((entries, observer) => {
                    for (const entry of entries) {

                        const contentsHeight = contentsElement.clientHeight;

                        const parentComputedStyle = getComputedStyle(parentElement);
                        const parentClientHeight = parentElement.clientHeight;
                        const parentMaxHeight = Math.max(standardScrollContentMaxInnerHeight, parentClientHeight);
                        const parentPaddingTop = parseFloat(parentComputedStyle.paddingTop);
                        const parentPaddingBottom = parseFloat(parentComputedStyle.paddingBottom);
                        const parentBorderWidth = parseFloat(parentComputedStyle.borderWidth);
                        const scrollContentMaxInnerHeight = parentMaxHeight - parentPaddingBottom - parentPaddingTop - (2*parentBorderWidth);

                        let thumbHeight;

                        if(scrollContentMaxInnerHeight <= contentsHeight) {
                            scrollElement.style.height = scrollContentMaxInnerHeight + 'px';
                            thumbHeight = scrollContentMaxInnerHeight**2 / contentsHeight;
                        }else{
                            scrollElement.style.height = contentsHeight + 'px';
                            thumbHeight = 0;
                        }
                        thumbElement.style.height = thumbHeight + 'px';
                        thumbPosition(scrollElement);
                    }
                });
                observer.observe(contentsElement);
                return () => {
                    observer.disconnect();
                };
            }
        }
    }, []);

    const ScrollHandeler = (e:Event) => {

        let scrollCheckTimeout: NodeJS.Timeout;

        if (e.target !== null && scrollContainer.current !== null) {
            const thumb = e.target.parentElement.children[1];

            if (!scrollCheck) {
                setScrollCheck(true);
                thumb.classList.add('is-scrolling');
            }

            clearTimeout(scrollCheckTimeout);

            scrollCheckTimeout = setTimeout(() => {
                setScrollCheck(false);
                thumb.classList.remove('is-scrolling');
            }, 1000);

            thumbPosition(e.target);
        }
    }

    const thumbPosition = (el) => {

        if(scrollContainer.current != null){
            const wrapper = el.children[0];
            const thumb = el.parentElement.children[1];
            const { clientHeight: outerH } = scrollContainer.current;
            const { clientHeight: innerH } = wrapper;
            const { top: outerTop } = scrollContainer.current.getBoundingClientRect();
            const { top: innerTop } = wrapper.getBoundingClientRect();
            const innerContainerY = outerTop - innerTop;
            const thumbH = thumb.clientHeight;
            const scrollYFactor = (innerH - thumbH) / (innerH - outerH);
            const maxThumbScrollY = outerH - thumbH;
            const thumbScrollY = innerContainerY * scrollYFactor;
            const revisedThumbScrollY =
                thumbScrollY < 1
                    ? 1
                    : thumbScrollY;
            thumb.style.transform = `translateY(${
                revisedThumbScrollY > maxThumbScrollY
                    ? maxThumbScrollY
                    : revisedThumbScrollY
            }px)`;
        }
    }

    return (
        <>
            <div className={"custom-scroll-container"} >
                <div className={"custom-scroll-wrapper"} ref={scrollContainer} onScroll={ScrollHandeler}>
                    <div className={"custom-scroll-area"}>
                        {children}
                    </div>
                </div>
                <div className={"custom-scroll-thumb"}></div>
            </div>
        </>
    );
};


export default ScrollBar;