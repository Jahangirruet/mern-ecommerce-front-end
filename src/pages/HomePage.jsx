import React, {useEffect} from 'react';
import Layout from "../component/layout/layout.jsx";
import SliderSkeleton from "../skeleton/slider-skeleton.jsx";
import FeaturesSkeleton from "../skeleton/features-skeleton.jsx";
import CategoriesSkeleton from "../skeleton/categories-skeleton.jsx";
import ProductsSkeleton from "../skeleton/products-skeleton.jsx";
import BrandSkeleton from "../skeleton/brand-skeleton.jsx";
import {ProductStore} from "../store/ProductStore.js";
import {FeatureStore} from "../store/FeatureStore.js";

import Brands from "../component/product/brands.jsx";
import Slider from "../component/product/slider.jsx"
import Features from "../component/product/features.jsx"
import Products from "../component/product/products.jsx"
import Categories from "../component/product/categories.jsx";


const HomePage = () => {
    const {BrandListRequest,CategoryRequest,SliderRequest,ListByRemarkRequest} = ProductStore();
    const {FeatureListRequest} = FeatureStore()

useEffect(()=>{
    (async ()=>{
        await BrandListRequest();
        await SliderRequest();
         await FeatureListRequest();
         await CategoryRequest();
        await ListByRemarkRequest("new");
    })()
},[])

    return (
            <Layout>
                <Slider />
                <Features />
                <Categories />
                <Products />
                <Brands />
            </Layout>
    );
};

export default HomePage;