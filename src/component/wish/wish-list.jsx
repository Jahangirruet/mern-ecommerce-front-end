import React, {useEffect} from 'react';
import ProductsSkeleton from "../../skeleton/products-skeleton.jsx";
import WishStore from "../../store/WishStore.js";
import NoData from "../NoData.jsx";
import {Link} from "react-router-dom";

const WishList = () => {

    const {WishListRequest,WishList,RemoveWishListRequest} = WishStore()
    useEffect(() => {
        (async () => {
            await WishListRequest();
        })()
    }, []);

    const remove = async(productID) =>{
        await RemoveWishListRequest(productID);
    }

    if(WishList===null){
        return (
            <div className="content">
                <div className="row">
                    <ProductsSkeleton/>
                </div>
            </div>
        )
    }else if(WishList===0){
        return (<NoData />)
    } else{
        return (
            <div className="container mt-3">
                <div className="row">
                    {
                        WishList.map((item,index)=>{
                            let price = <p className="bodyMedium text-dark my-1">Price:{item['product']['price']}</p>;
                            if(item['product']['discount']===true){
                                price = <p className="bodyMedium text-dark my-1">Price:
                                    <strike>{item['product']['price']}</strike> {item['product']['discountPrice']} </p>;
                            }
                            return(
                                <div key={index} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                    <div className="card shadow-sm h-100 rounded-3 bg-white">
                                        <img className="w-100 rounded-top-2" src={item['product']['image']} />
                                        <div className="card-body">
                                            <p className="bodySmal text-secondary my-1">{item['product']['title']}</p>
                                            {price}
                                            {/*<StarRatings rating={parseFloat(item['product']['star'])} starRatedColor="red" starDimension="15px" starSpacing="2px" />*/}
                                            <p className="mt-3">
                                                <button className="btn btn-outline-danger btn-sm" onClick={async ()=>{await remove(item['productID'])}} >Remove</button>
                                                <Link to={`/details/${item['productID']}`} className="btn mx-2 btn-outline-primary btn-sm">Details</Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            )
                        })
                    }
                </div>
            </div>
        )
    }
};

export default WishList;