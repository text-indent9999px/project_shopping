import React, {useEffect, useState} from "react";
import BasicLayout from '@/components/layout/BasicLayout';
import Product1 from "@/components/product/Product1";
import {useSelector} from "react-redux";
import '../../styles/pages-prdList.scss';
import { useRouter } from 'next/router';
import {get, ref} from "firebase/database";
import {RootState, ProductData} from "@/types/types";
import ColorCheck from "@/components/common/ColorCheck";
const metadata = {
    title: 'Prd List Page',
    description: 'This is the test page',
};

interface LayoutProps {
    children: React.ReactNode;
}

interface cateInfoInterface {
    banner_img: [],
    cate_no: number,
    name: string,
    parent_cate_no: number,
    desc: string,
}


const PrdList: React.FC<LayoutProps> = ({ children }) => {

    const deviceCheck = useSelector((state:RootState) => state.browser.device);
    const router = useRouter();
    const { cate_no } = router.query;
    const [cateSort, setCateSort] = useState('basic');
    const [cateGrid, setCateGrid] = useState(3);
    const [cateData, setCateData] = useState<ProductData[] | null>(null);
    const [cateInfo, setCateInfo] = useState<cateInfoInterface | null>(null);
    const database = useSelector((state:RootState) => state.firebase.database);
    const productListRef = ref(database, 'product_list');
    const cateListRef = ref(database, 'cate_list');

    useEffect(()=>{
        switch(deviceCheck){
            case 'MOBILE' :
                setCateGrid(1);
                break;
            case 'TABLET' :
                setCateGrid(2);
                break;
            case 'PC' :
                setCateGrid(3);
                break;
        }
    },[deviceCheck])

    useEffect(() => {
        get(productListRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setCateData(data['category'][Number(cate_no)]);
                    console.log('prd list data complete');
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error('Error reading data from the database:', error);
            });

        get(cateListRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setCateInfo(data[Number(cate_no)]);
                    console.log('prd cate data complete');
                } else {
                    console.log('No data available');
                }
            })
            .catch((error) => {
                console.error('Error reading data from the database:', error);
            });

        setCateSort('basic');
    }, [cate_no]);

    return (
        <BasicLayout metadata={metadata} headerFixed={true}>
            <div className="custom-page-banner-wrap" data-header-fixed="true">
                <ul className="custom-page-banners">
                    <li className="custom-page-banner">
                        <div className={`custom-page-title-box`}>
                            <h3>{cateInfo ? cateInfo.name : ''}</h3>
                            {cateInfo && cateInfo.desc && <p>{cateInfo.desc}</p>}
                        </div>
                        {cateInfo && (
                            <ul className={`custom-page-banner_box`}>
                                {cateInfo.banner_img.map((item, index) => {
                                    if (item) {
                                        return (
                                            <li key={index}>
                                                <ColorCheck imgSrc={item} alt={cateInfo.name}></ColorCheck>
                                            </li>
                                        );
                                    }else{
                                        return (
                                            <li key={index}>
                                                <ColorCheck imgSrc={"/images/main-img01.jpg"} alt={cateInfo.name}></ColorCheck>
                                            </li>
                                        );
                                    }
                                })}
                            </ul>
                        )}
                    </li>
                </ul>
            </div>

            <div className="custom-page-product-list">
                <div className="custom-inner-basic">
                    <div className={"custom-page-product-top"}>
                        <div className={"custom-page-product-info"}>
                            <p>총 <strong>{cateData ? cateData.length : 0}</strong>개</p>
                        </div>
                        <div className={`custom-page-product-actions`}>
                            <div className={`custom-page-product-sort`}>
                                <ul>
                                    <li className={`${cateSort == 'new' ? 'is-active' : ''}`} onClick={(e) => setCateSort('new')}>신상품 순</li>
                                    <li className={`${cateSort == 'best' ? 'is-active' : ''}`} onClick={(e) => setCateSort('best')}>인기상품 순</li>
                                    {/*<li className={`${cateSort == 'review' ? 'is-active' : ''}`} onClick={(e) => setCateSort('review')}>리뷰 많은 순</li>*/}
                                    <li className={`${cateSort == 'lower' ? 'is-active' : ''}`} onClick={(e) => setCateSort('lower')}>낮은 가격 순</li>
                                    <li className={`${cateSort == 'higher' ? 'is-active' : ''}`} onClick={(e) => setCateSort('higher')}>높은 가격 순</li>
                                </ul>
                            </div>
                            {/*<div className={`custom-page-product-grid`}>*/}
                            {/*    <ul>*/}
                            {/*        <li className={`${cateGrid == 1 ? 'is-active' : ''}`} onClick={(e) => setCateGrid(1)}></li>*/}
                            {/*        <li className={`${cateGrid == 2 ? 'is-active' : ''}`} onClick={(e) => setCateGrid(2)}></li>*/}
                            {/*        <li className={`${cateGrid == 3 ? 'is-active' : ''}`} onClick={(e) => setCateGrid(3)}></li>*/}
                            {/*    </ul>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    {cateData && <Product1 data={cateData} grid={cateGrid} output={12} page={1} pageSet={5} moreview={true} moreviewtype={'pagination'} sort={cateSort}/>}
                    {cateData == null && <div className={"custom-page-nodata"}>
                        <p>해당하는 내용이 없습니다.</p>
                    </div>}
                </div>
            </div>
        </BasicLayout>
    );
}

export default PrdList;