import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {scrollAction} from "@/actions/actions";

const ScrollHandler = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
            let getBodyPositionTop = Math.abs(parseInt(document.body.style.top, 10));
            if(isNaN(getBodyPositionTop)){
                if (window.scrollY > 0) {
                    dispatch(scrollAction(true));
                } else {
                    dispatch(scrollAction(false));
                }
            }else{
                dispatch(scrollAction(true));
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [dispatch]);

    return null;
};

export default ScrollHandler;