import {ElementInViewport} from "@/components/hook/ElemetnInViewport";
import {NoResult} from "@/components/common/NoResult";
import {useState} from "react";

export type ImgProps = {
    src: string;
    alt: string;
    lazy: boolean | false;
};

export default function LazyImg(props: ImgProps) {
    const { src, alt, lazy } = props;
    const { elementRef, isVisible } = ElementInViewport({
        rootMargin: '0px 0px 0px 0px',
    });
    const [loading, setLoading] = useState(false);
    const loadHandler = () => {
        setLoading(true);
    }
    return (
        <div className={`custom-lazy-img ${loading ? 'is-load-complete' : ''}`}>
            {isVisible ? <img alt={alt} src={src} onLoad={loadHandler}/> : <span className={'custom-no-image'} ref={elementRef}></span>}
        </div>
    );
}