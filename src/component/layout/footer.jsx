import React from 'react';
import {Link} from "react-router-dom";
import pay from "../../assets/images/pay.png"

const Footer = () => {
    return (
        <div>
            <div>
                <div className="section-bottom shadow-sm bg-light">
                    <div className="container py-5">
                        <div className="row">
                            <div className="col-md-3">
                                <h1 className="bodyMedium">Legals</h1>
                                <p className="my-2">
                                    <Link className="nav-link" to="/about">About</Link>
                                </p>
                                <p className="my-2">
                                    <Link className="nav-link" to="/refund">Refund Policy</Link>
                                </p>
                                <p className="my-2">
                                    <Link className="nav-link" to="/pricacy">Privacy Policy</Link>
                                </p>
                                <p className="my-2">
                                    <Link className="nav-link" to="/terms">Terms</Link>
                                </p>
                            </div>
                            <div className="col-md-3">
                                <h1 className="bodyMedium">Information</h1>
                                <p className="my-2"><Link className="nav-link" to="/how-to-buy">How to buy</Link>
                                </p>
                                <p className="my-2">
                                    <Link className="nav-link" to="/contact">Contact</Link>
                                </p>
                                <p className="my-2">
                                    <Link className="nav-link" to="/complain">Complain</Link>
                                </p>
                            </div>
                            <div className="col-md-3">
                                <h1 className="bodyMedium">CONNECT</h1>
                                <p className="my-2"><Link className="nav-link" to="/how-to-buy">How to buy</Link>
                                </p>
                                <p className="my-2">
                                    <Link className="nav-link" to="/contact">Contact</Link>
                                </p>
                                <p className="my-2">
                                    <Link className="nav-link" to="/complain">Complain</Link>
                                </p>
                            </div>
                            
                            <div className="col-md-3">
                                <h1 className="bodyMedium">We accept</h1>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum </p>
                                <img className="w-100" src={pay} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-dark py-3 text-center">
                    <p className="text-white bodySmal">All Rights Reserved </p>
                </div>
            </div>
        </div>
    );
};

export default Footer;