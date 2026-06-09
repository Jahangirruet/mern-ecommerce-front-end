import React from 'react';
import Layout from "../component/layout/layout.jsx";
import InvoiceDetails from "../component/invoice/invoice-details.jsx";


const InvoicePage = () => {
    return (
        <Layout>
            <InvoiceDetails />
        </Layout>
    );
};

export default InvoicePage;