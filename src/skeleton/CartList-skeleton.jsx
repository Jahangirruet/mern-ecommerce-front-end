import React from 'react';
import Lottie from "lottie-react";
import ImagePlaceHolder from '../assets/images/image.json'


const CartListSkeleton = () => {
    return (
        <>
            <div className="container mt-3">
                <div className="row">
                    <div className="col-md-12">
                        <div className="list-group-flush">
                            <li className="list-group-item d-flex align-items-start"></li>
                            <Lottie style={{width:"100px"}} animationData={ImagePlaceHolder} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartListSkeleton;