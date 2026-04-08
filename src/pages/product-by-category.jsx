import React, {useEffect} from 'react';
import ProductStore from "../store/ProductStore.js";
import {useParams} from "react-router-dom";
import Layout from "../component/layout/layout.jsx";
import ProductList from "../component/product/product-list.jsx";

const ProductByCategory = () => {
    const {ListByCategoryRequest} = ProductStore();
    const {categoryID} = useParams();

    useEffect(() => {
        (async () => {
            await ListByCategoryRequest(categoryID)
        })()
    },[])
    return (
        <Layout>
            <ProductList />
        </Layout>
    );
};

export default ProductByCategory;