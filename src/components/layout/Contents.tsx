import React from "react";
import Head from "next/head";
import {checkHeaderFixed} from "@/actions/actions";
import {useDispatch} from "react-redux";


interface LayoutProps {
    children: React.ReactNode;
    metadata: {
        title: string;
        description: string;
    };
    headerFixed?: boolean;
}

const Contents: React.FC<LayoutProps> = ({ children, metadata, headerFixed = false}) => {

    const dispatch = useDispatch();
    dispatch(checkHeaderFixed(headerFixed));

    return(
        <>
            <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="google" content="notranslate" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" />
            </Head>
            <div className="contents-container">
                {children}
            </div>
        </>
    )
}

export default Contents;