import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {scrollAction} from "@/actions/actions";

const ScrollHandler = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleScroll = () => {
            // 스크롤 이벤트를 처리하고 스크롤 상태를 업데이트합니다.
            if (window.scrollY > 0) {
                dispatch(scrollAction(true)); // 스크롤 시 스크롤 액션 dispatch
            } else {
                dispatch(scrollAction(false)); // 스크롤이 최상단에 도달하면 false로 설정
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