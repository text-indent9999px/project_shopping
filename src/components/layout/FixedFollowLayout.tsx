import React from 'react';
import './FixedFollowLayout.scss';
import ScrollBar from "@/components/scroll/ScrollBar";
import {useSelector} from "react-redux";
import {RootState} from "@/types/types";

interface LayoutProps {
    children: React.ReactNode,
}

const FixedFollowLayout: React.FC<LayoutProps> = ({ children}) => {

    const childrenArray = React.Children.toArray(children);

    const children1 = childrenArray[0];
    const children2 = childrenArray[1];

    return (
        <>
            <div className={"custom-fixedFollow-page-container type1"}>
                <div className={"custom-fixedFollow-page-wrap custom-inner-wide"}>
                    <div className={"custom-fixedFollow-fixed"}>
                        {children1}
                    </div>
                    <div className={"custom-fixedFollow-follow"}>
                        <div className={"custom-fixedFollow-floating"}>
                            <ScrollBar>{children2}</ScrollBar>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default FixedFollowLayout;