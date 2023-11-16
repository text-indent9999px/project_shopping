import React, {useContext, useState, useEffect, useRef} from 'react';
import BasicLayout from '../components/layout/BasicLayout';

import Link from "next/link";
import '../styles/pages-main.scss';
import Product1 from "@/components/product/Product1";
import {useSelector} from "react-redux";
import {RootState} from "@/types/types";
import {get, onValue, ref} from "firebase/database";
import ColorCheckSwiper from "@/components/common/ColorCheckSwiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, EffectCreative } from 'swiper/modules';
import Button from "@/components/button/Button";

const metadata = {
    title: 'Index Page',
    description: 'This is the test page',
};



export default function Index() {

    const imgRef = useRef(null);
    const deviceCheck = useSelector((state:RootState) => state.browser.device);

    const database = useSelector((state:RootState) => state.firebase.database);
    const productListRef = ref(database, 'product_list');
    const [testData, setTestData] = useState(null);
    const [testData2, setTestData2] = useState(null);

    const [cateGrid, setCateGrid] = useState(4);
    const [cateGrid2, setCateGrid2] = useState(3);


    useEffect(() => {
        onValue(productListRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setTestData(data.category['10']);
                setTestData2(data.category['11']);
                console.log('index data load complete');
            } else {
                console.log('No data available');
            }
        });
        // const element = imgRef.current;
        // intersectionObserve(element, calculateBrightness);
    }, []);


    useEffect(()=>{
        switch(deviceCheck){
            case 'MOBILE' :
                setCateGrid(1);
                setCateGrid2(1);
                break;
            case 'TABLET' :
                setCateGrid(2);
                setCateGrid2(2);
                break;
            case 'PC' :
                setCateGrid(4);
                setCateGrid2(3);
                break;
        }
    },[deviceCheck])

    return (
        <BasicLayout metadata={metadata}>
            <div className="main-banner-container" data-header-fixed="true">

                <Swiper
                    modules={[Navigation, Scrollbar, EffectCreative, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    grabCursor={true}
                    effect={'creative'}
                    pagination
                    creativeEffect={{
                        prev: {
                            shadow: true,
                            translate: ['-20%', 0, -1],
                        },
                        next: {
                            translate: ['100%', 0, 0],
                        },
                    }}
                >
                    <SwiperSlide>
                        <>
                            <ColorCheckSwiper>
                                <Link href={'/product/list'}>
                                    <img src={'/images/main-img01.jpg'} alt={'My Image'} crossOrigin={"anonymous"} />
                                    <div className="text-box">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <h3>With Your Pet's Time</h3>
                                        <p>바쁜 일상 속에서도 <br /> 반려동물과의 소중한 시간을 보내세요.</p>
                                        <Button><span>자세히 보기</span></Button>
                                    </div>
                                </Link>
                            </ColorCheckSwiper>
                        </>
                    </SwiperSlide>
                    <SwiperSlide>
                        <>
                            <ColorCheckSwiper>
                                <Link href={'/product/list'}>
                                    <img src={'https://firebasestorage.googleapis.com/v0/b/projectshopping-ef0b8.appspot.com/o/product%2Fprd-img20.jpg?alt=media&token=f41655a9-f97b-44b6-8653-cf00af91cc87'} alt={'My Image'} crossOrigin={"anonymous"} />
                                    <div className="text-box">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <h3>With Your Pet's Time</h3>
                                        <p>바쁜 일상 속에서도 <br /> 반려동물과의 소중한 시간을 보내세요.</p>
                                        <Button><span>자세히 보기</span></Button>
                                    </div>
                                </Link>
                            </ColorCheckSwiper>
                        </>
                    </SwiperSlide>
                    <SwiperSlide>
                        <>
                            <ColorCheckSwiper>
                                <Link href={'/product/list'}>
                                    <img src={'https://firebasestorage.googleapis.com/v0/b/projectshopping-ef0b8.appspot.com/o/product%2Fprd-img37.jpg?alt=media&token=f41655a9-f97b-44b6-8653-cf00af91cc87'} alt={'My Image'} crossOrigin={"anonymous"} />
                                    <div className="text-box">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <h3>With Your Pet's Time</h3>
                                        <p>바쁜 일상 속에서도 <br /> 반려동물과의 소중한 시간을 보내세요.</p>
                                        <Button><span>자세히 보기</span></Button>
                                    </div>
                                </Link>
                            </ColorCheckSwiper>
                        </>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className="main-prd-container main-section">
                <div className="main-title-box">
                    <h3>New Product</h3>
                    <p>신상품을 만나보세요.</p>
                </div>
                <div className="main-contents-box">
                    {testData && <Product1 data={testData} grid={cateGrid} output={4} page={1} pageSet={5} moreview={true} moreviewtype={'pagination'} sort={'new'}/>}
                </div>
            </div>
            <div className="main-prd-container2 main-section">
                <div className="main-title-box">
                    <h3>Best Product</h3>
                    <p>가장 인기있는 제품을 보여드려요.</p>
                </div>
                <div className="main-contents-box">
                    {testData2 && <Product1 data={testData2} grid={cateGrid2} output={3} page={1} pageSet={5} moreview={true} moreviewtype={'pagination'} sort={'best'}/>}
                </div>
            </div>

            <div className={"main-last-section"}>
                <div className="main-title-box">
                    <h3>Video Section</h3>
                    <p>모든 고양이는 걸작이다. <br />
                        Every smallest feline is a masterpiece.<br />
                        - Leonardo da Vinci
                    </p>
                </div>
                <div className={"custom-video-box"}>
                    <div className={"custom-video-box-inner"}>
                        <iframe frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                title="코비의 이런 모습 처음봤어요!! 새로운 놀이방을 본 고양이 반응"
                                src="https://www.youtube.com/embed/RYEd3FHzLHg;t=7s?autoplay=1&amp;mute=1&amp;controls=0&amp;playsinline=1&amp;loop=1&amp;controls=0&amp;frameborder=0&amp;enablejsapi=1&amp;widgetid=1?&amp;"></iframe>
                    </div>
                </div>
            </div>

        </BasicLayout>
    );
}