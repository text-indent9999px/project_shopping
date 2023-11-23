import { useEffect, useState } from 'react';
import { ElementInViewport } from "@/components/hook/ElemetnInViewport";

export const ImgLoaded = (lazy: boolean) => {
    const { elementRef, isVisible } = ElementInViewport({
        rootMargin: '0px 0px 500px 0px',
    });
    const [isLoaded, setIsLoaded] = useState(!lazy);
    useEffect(() => {
        if (isLoaded || !isVisible) {
            return;
        }
        setIsLoaded(true);
    }, [isVisible]);
    return { elementRef, isLoaded };
};