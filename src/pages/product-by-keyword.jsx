import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from "../component/layout/layout.jsx";
import ProductList from "../component/product/product-list.jsx";

const ProductByKeyword = () => {
    const {ListByKeywordRequest} = ProductStore();
    const {keyword} = useParams();

    useEffect(() => {
        (async () => {
            await ListByKeywordRequest(keyword)
        })()
    },[])
    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductByKeyword;