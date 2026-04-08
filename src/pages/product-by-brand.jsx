import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from "../component/layout/layout.jsx";
import ProductList from "../component/product/product-list.jsx";

const ProductByBrand = () => {
    const {ListByBrandRequest} = ProductStore();
    const {id} = useParams();

    useEffect(() => {
        (async () => {
           await ListByBrandRequest(id)
        })()
    },[])
    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductByBrand;