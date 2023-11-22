import Link from "next/link";
import LogoBasic from "@/components/svg/LogoBasic";
import React, {useEffect, useRef} from "react";
import './Footer.scss';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/types/types";
import {checkFooterHeight} from "@/actions/actions";

interface LayoutProps {
    children?: React.ReactNode;
}

const Footer: React.FC<LayoutProps> = ({ children }) => {

    const deviceCheck = useSelector((state:RootState) => state.browser.device);
    const footerRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if(footerRef.current){
            let $footer = footerRef.current as HTMLElement;
            dispatch(checkFooterHeight($footer.getBoundingClientRect().height));
        }
    },[]);

    return (
        <footer className="footer-container" ref={footerRef}>
            <div className={"custom-inner-wide"}>
                <div className="logo-container">
                    <Link href={'/'}><LogoBasic width={deviceCheck == 'PC' ? 60 : 40} /><span className={"custom-text-hidden"}>HOME</span></Link>
                </div>
                <div className={"info-container"}>
                    <ul>
                        <li>
                            <strong>made by.</strong>
                            <span>kny</span>
                        </li>
                        <li>
                            <strong>skills.</strong>
                            <span>react, next.js, typescript, redux, firebase, scss</span>
                        </li>
                        <li>
                            <strong>time taken.</strong>
                            <span>3 weeks</span>
                        </li>
                        <li>
                            <strong>Contribution.</strong>
                            <span>100%</span>
                        </li>
                        <li>
                            <strong>github.</strong>
                            <span>https://github.com/text-indent9999px/project_shopping</span>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <strong>This website has been created for portfolio purposes.</strong>
                            <span>이 사이트는 포트폴리오용으로 제작되었습니다.</span>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;