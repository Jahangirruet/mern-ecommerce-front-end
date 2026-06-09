import React from 'react';
import InvoiceList from "../component/invoice/invoice-list.jsx";
import Layout from "../component/layout/layout.jsx";


const OrderPage = () => {
    return (
        <Layout>
            <InvoiceList />
        </Layout>
    );
};

export default OrderPage;