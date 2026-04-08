import React, {useEffect} from 'react';
import Layout from "../component/layout/layout.jsx";
import Details from "../component/product/details.jsx";
import {useParams} from "react-router-dom";
import Brands from "../component/product/brands.jsx";
import ProductStore from "../store/ProductStore.js";

const ProductDetails = () => {
    const {DetailsRequest,ReviewRequest,BrandListRequest} = ProductStore()
    const {id} = useParams();

    useEffect(()=>{
        (async ()=>{
            await DetailsRequest(id);
            await ReviewRequest(id);
            BrandListRequest === null ? await BrandListRequest() : null;
        })()
    },[])
    return (
        <Layout>
            <Details />
            <Brands />
        </Layout>
    );
};

export default ProductDetails;