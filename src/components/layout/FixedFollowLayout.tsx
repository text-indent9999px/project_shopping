import React from 'react';
import './FixedFollowLayout.scss';
import ScrollBar from "@/components/scroll/ScrollBar";
import {useSelector} from "react-redux";
import {RootState} from "@/types/types";

interface LayoutProps {
    children: React.ReactNode,
}

const FixedFollowLayout: React.FC<LayoutProps> = ({ children}) => {

    const deviceCheck = useSelector((state:RootState) => state.browser.device);
    const childrenArray = React.Children.toArray(children);

    const children1 = childrenArray[0];
    const children2 = childrenArray[1];

    return (
        <>
            <div className={"custom-fixedFollow-page-container"} data-device={deviceCheck}>
                <div className={"custom-fixedFollow-page-wrap custom-inner-wide"}>
                    <div className={"custom-fixedFollow-fixed"}>
                        {children1}
                    </div>
                    <div className={"custom-fixedFollow-follow"}>
                        {deviceCheck == 'PC' && <div className={"custom-fixedFollow-floating"}>
                            <ScrollBar>{children2}</ScrollBar>
                        </div>}
                        {deviceCheck !== 'PC' && <div className={"custom-fixedFollow-follow-inner"}>{children2}</div> }
                    </div>
                </div>
            </div>
        </>
    );
};


export default FixedFollowLayout;