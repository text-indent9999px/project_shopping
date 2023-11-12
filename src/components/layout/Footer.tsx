import Link from "next/link";
import LogoBasic from "@/components/svg/LogoBasic";
import React from "react";
import './footer.scss';

interface LayoutProps {
    children: React.ReactNode;
}

const Footer: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="footer-container">
            <div className={"custom-inner-wide"}>
                <div className="logo-container">
                    <Link href={'/'}><LogoBasic width={60} /></Link>
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
        </div>
    );
};

export default Footer;