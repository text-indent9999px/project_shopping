import React, {useState, useEffect, useRef} from 'react';
import BasicLayout from '../components/layout/BasicLayout';
import Link from "next/link";
import '../styles/pages-main.scss';
import Product1 from "@/components/product/Product1";
import {useSelector} from "react-redux";
import {RootState} from "@/types/types";
import {onValue, ref} from "firebase/database";
import ColorCheckSwiper from "@/components/common/ColorCheckSwiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, EffectCreative } from 'swiper/modules';
import YouTube from 'react-youtube';

const metadata = {
    title: 'Index Page',
    description: 'This is the test page',
};



export default function Index() {

    const deviceCheck = useSelector((state:RootState) => state.browser.device);
    const database = useSelector((state:RootState) => state.firebase.database);
    const productListRef = ref(database, 'product_list');
    const [cateData, setCateData] = useState(null);
    const [cateData2, setCateData2] = useState(null);
    const [cateGrid, setCateGrid] = useState(4);
    const [cateGrid2, setCateGrid2] = useState(3);
    const [cateView, setCateView] = useState(3);

    useEffect(() => {
        onValue(productListRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                setCateData(data.category['10']);
                setCateData2(data.category['11']);
                //console.log('index data load complete');
            } else {
                //console.log('No data available');
            }
        });
    }, []);


    useEffect(()=>{
        switch(deviceCheck){
            case 'MOBILE' :
                setCateGrid(1);
                setCateGrid2(1);
                setCateView(4);
                break;
            case 'TABLET' :
                setCateGrid(2);
                setCateGrid2(2);
                setCateView(4);
                break;
            case 'PC' :
                setCateGrid(4);
                setCateGrid2(3);
                setCateView(3);
                break;
        }
    },[deviceCheck])

    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
            mute: 1,
            controls: 0,
            playsinline: 1,
            loop: 1,
            frameborder: 0,
            enablejsapi: 1,
            widgetid: 1,
            start: 7,
        },
    };

    return (
        <BasicLayout metadata={metadata} headerFixed={true}>
            <div className="main-banner-container" data-header-fixed="true">

                <Swiper
                    modules={[Navigation, Scrollbar, EffectCreative, Pagination]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation
                    grabCursor={true}
                    effect={'creative'}
                    pagination={{ clickable: true }}
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
                                <Link href={'/product/list?cate_no=10'}>
                                    <img src={'https://firebasestorage.googleapis.com/v0/b/projectshopping-ef0b8.appspot.com/o/product%2Fprd-img21.jpg?alt=media&token=f41655a9-f97b-44b6-8653-cf00af91cc87'} alt={'My Image'} crossOrigin={"anonymous"} />
                                    <div className="text-box">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <h3><mark>new</mark></h3>
                                        <p><mark>Brown Color Palettes</mark></p>
                                        {/*<Button><span>자세히 보기</span></Button>*/}
                                    </div>
                                </Link>
                            </ColorCheckSwiper>
                        </>
                    </SwiperSlide>
                    <SwiperSlide>
                        <>
                            <ColorCheckSwiper>
                                <Link href={'/product/list?cate_no=11'}>
                                    <img src={'https://firebasestorage.googleapis.com/v0/b/projectshopping-ef0b8.appspot.com/o/product%2Fprd-img16.jpg?alt=media&token=f41655a9-f97b-44b6-8653-cf00af91cc87'} alt={'My Image'} crossOrigin={"anonymous"} />
                                    <div className="text-box">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <h3><mark>best</mark></h3>
                                        <p><mark>Yellow Color Palettes</mark></p>
                                        {/*<Button><span>자세히 보기</span></Button>*/}
                                    </div>
                                </Link>
                            </ColorCheckSwiper>
                        </>
                    </SwiperSlide>
                    <SwiperSlide>
                        <>
                            <ColorCheckSwiper>
                                <Link href={'/product/list?cate_no=10'}>
                                    <img src={'https://firebasestorage.googleapis.com/v0/b/projectshopping-ef0b8.appspot.com/o/product%2Fprd-img34.jpg?alt=media&token=f41655a9-f97b-44b6-8653-cf00af91cc87'} alt={'My Image'} crossOrigin={"anonymous"} />
                                    <div className="text-box">
                                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                                        <h3><mark>cat & dog</mark></h3>
                                        <p><mark>Green Color Palettes</mark></p>
                                        {/*<Button><span>자세히 보기</span></Button>*/}
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
                    {cateData && <Product1 data={cateData} grid={cateGrid} output={4} page={1} pageSet={5} moreview={true} moreviewtype={'pagination'} sort={'new'}/>}
                </div>
            </div>
            <div className="main-prd-container2 main-section">
                <div className="main-title-box">
                    <h3>Best Product</h3>
                    <p>가장 인기있는 제품을 보여드려요.</p>
                </div>
                <div className="main-contents-box">
                    {cateData2 && <Product1 data={cateData2} grid={cateGrid2} output={cateView} page={1} pageSet={5} moreview={true} moreviewtype={'pagination'} sort={'best'}/>}
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
                        <YouTube videoId="RYEd3FHzLHg" opts={opts} />
                    </div>
                </div>
            </div>
        </BasicLayout>
    );
}