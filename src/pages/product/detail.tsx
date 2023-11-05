import BasicLayout from '@/components/layout/BasicLayout';
import Link from "next/link";
import Product1 from "@/components/product/Product1";
import {useSelector} from "react-redux";
import {AppState, ProductData} from "@/types/types";

const metadata = {
    title: 'Prd Detail Page',
    description: 'This is the test page',
};


export default function PrdDetail() {

    // @ts-ignore
    const productData = useSelector((state: ProductData) => state.product);

    return (
        <BasicLayout metadata={metadata}>
            작업중
        </BasicLayout>
    );
}