import React, {ReactNode, useEffect, useState} from 'react';
import './FixedFollowLayout.scss';
import ScrollBar from "@/components/scroll/ScrollBar";
import {useSelector} from "react-redux";
import {RootState} from "@/types/types";

import DraggablePanel from "@/components/common/DraggablePanel";
import {disableScroll, enableScroll} from "@/function/Common";

interface LayoutProps {
    children: React.ReactNode,
}

const FixedFollowLayout2: React.FC<LayoutProps> = ({ children}) => {

    const childrenArray = React.Children.toArray(children);

    const children1 = childrenArray[0];
    const children2 = childrenArray[1];
    const children3 = childrenArray[2];

    const isFooter = useSelector((state:RootState) => state.scroll.isFooter);
    const [contentsOpen, setContentsOpen] = useState(false);

    const setPosition = (boo:boolean) => {
        setContentsOpen(boo);
    }

    useEffect(()=>{
        if(contentsOpen){
            disableScroll();
        }else{
            enableScroll();
        }
    }, [contentsOpen])

    return (
        <>
            <div className={"custom-fixedFollow-page-container type2"}>
                <div className={"custom-fixedFollow-page-wrap custom-inner-basic"}>
                    <div className={"custom-fixedFollow-fixed"}>
                        {children1}
                    </div>
                </div>
                <DraggablePanel className={`${contentsOpen ? 'is-open' : 'is-close'}`} onPositionSet={setPosition} onPosition={contentsOpen}>
                    <div className={`custom-fixedFollow-follow`}>
                        <div className={"custom-fixedFollow-floating"}>
                            <ScrollBar>{children2}</ScrollBar>
                        </div>
                    </div>
                </DraggablePanel>
                <div className={`custom-fixedFollow-fixed-buttons ${isFooter ? 'is-footer' : ''}`} onClick={()=>setPosition(true)}>
                    {children3}
                </div>
            </div>
        </>
    );
};


export default FixedFollowLayout2;