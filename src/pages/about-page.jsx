import React, {useEffect} from 'react';
import Layout from "../component/layout/layout.jsx";
import LegalContents from "../component/features/legal-contents.jsx";
import FeatureStore from "../store/FeatureStore.js";

const AboutPage = () => {
    const {LegalDetailsRequest} = FeatureStore()
    useEffect(()=>{
        (async () => {
            await LegalDetailsRequest("about")
        })()
    },[]);
    return (
        <Layout>
            <LegalContents />
        </Layout>
    );
};

export default AboutPage;