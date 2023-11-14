import React from 'react';
import './Title.scss';

interface LayoutProps {
    title?: string,
    desc?: string,
    children?: React.ReactNode,
}

const Title: React.FC<LayoutProps> = ({title = '', desc = '', children}) => {
    return (
        <>
            <div className={"custom-page-title"}>
                <h3>{title}</h3>
                {desc !== '' && <p>{desc}</p>}
                {children}
            </div>
        </>
    );
};

export default Title;