import React, {useRef, useState, useEffect} from 'react';
import './ScrollBar.scss';
import {clearInterval} from "timers";

interface LayoutProps {
    children?: React.ReactNode,
}

const ScrollBar: React.FC<LayoutProps> = ({ children }) => {

    const scrollContainer = useRef<HTMLDivElement | null>(null);
    const [scrollCheck, setScrollCheck] = useState(false);
    let chkFull = false;
    let scrollContentsFlag = true;
    const [viewCheck, setViewCheck] = useState(false);

    useEffect(() => {
        const options = {
            root: null, // use the viewport as the root
            rootMargin: '0px',
            threshold: 0.5, // percentage of target element which should be visible
        };
        const observer = new IntersectionObserver(handleIntersection, options);
        if (scrollContainer.current !== null) {
            observer.observe(scrollContainer.current);
        }
        return () => {
            observer.disconnect();
        };
    }, []);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setViewCheck(true);
            } else {
                setViewCheck(false);
            }
        });
    };

    useEffect(() => {



        if(scrollContainer.current != null){

            const scrollElement = scrollContainer.current;
            const parentElement = scrollContainer.current.parentElement;

            if(parentElement !== null){

                const standardElement = parentElement.parentElement;
                const contentsElement = scrollContainer.current.children[0];
                const thumbElement = parentElement.children[1];

                if(contentsElement !== null && thumbElement !== null && standardElement !== null){

                    const standardComputedStyle = getComputedStyle(standardElement);
                    let standardMaxHeight = Math.max(parseFloat(standardComputedStyle.maxHeight), standardElement.clientHeight);

                    if(standardComputedStyle.maxHeight == 'none'){
                        scrollContentsFlag = false;
                    }

                    if(scrollContentsFlag){
                        if(isNaN(standardMaxHeight) || standardMaxHeight == 0){
                            standardMaxHeight = standardElement.clientHeight;
                            chkFull = true;
                        }
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

                                if(chkFull){
                                    scrollElement.style.height = scrollContentMaxInnerHeight + 'px';
                                    thumbHeight = scrollContentMaxInnerHeight**2 / contentsHeight;
                                }else{
                                    if(scrollContentMaxInnerHeight <= contentsHeight) {
                                        scrollElement.style.height = scrollContentMaxInnerHeight + 'px';
                                        thumbHeight = scrollContentMaxInnerHeight**2 / contentsHeight;
                                    }else{
                                        scrollElement.style.height = contentsHeight + 'px';
                                        thumbHeight = 0;
                                    }
                                }

                                // @ts-ignore
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
            }
        }
    }, [viewCheck]);

    const scrollHandler = (e: any) => {

        let scrollCheckTimeout: NodeJS.Timeout;
        let targetElement: Element | null = e.target as Element;

        if (targetElement !== null && scrollContainer.current !== null && targetElement.parentElement !== null) {
            const thumb = targetElement.parentElement.children[1];

            if (!scrollCheck) {
                setScrollCheck(true);
                thumb.classList.add('is-scrolling');
            }
            // @ts-ignore
            clearTimeout(scrollCheckTimeout);
            scrollCheckTimeout = setTimeout(() => {
                setScrollCheck(false);
                thumb.classList.remove('is-scrolling');
            }, 1000);
            thumbPosition(e.target);
        }
    }


    const thumbPosition = (el:Element) => {

        if(scrollContainer.current != null && el.parentElement !== null){
            const wrapper = el.children[0] as HTMLElement;
            const thumb = el.parentElement.children[1] as HTMLElement;
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
                <div className={"custom-scroll-wrapper"} ref={scrollContainer} onScroll={scrollHandler}>
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