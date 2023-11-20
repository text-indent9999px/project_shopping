import { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {scrollAction, scrollFooterCheck} from "@/actions/actions";
import {RootState} from "@/types/types";

const ScrollHandler = () => {
    const dispatch = useDispatch();
    const footerHeight = useSelector((state:RootState) => state.check_footer.footerHeight);

    useEffect(() => {
        const handleScroll = () => {
            let getBodyPositionTop = Math.abs(parseInt(document.body.style.top, 10));
            let footerScrollPosition = document.documentElement.offsetHeight - footerHeight - window.innerHeight - 50;

            if(isNaN(getBodyPositionTop)){
                if (window.scrollY > 0) {
                    dispatch(scrollAction(true));
                    if(window.scrollY >= footerScrollPosition){
                        dispatch(scrollFooterCheck(true));
                    }else{
                        dispatch(scrollFooterCheck(false));
                    }
                } else {
                    dispatch(scrollAction(false));
                    dispatch(scrollFooterCheck(false));
                }
            }else{
                dispatch(scrollAction(true));
                if(getBodyPositionTop > footerScrollPosition){
                    dispatch(scrollFooterCheck(true));
                }else{
                    dispatch(scrollFooterCheck(false));
                }
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