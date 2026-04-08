import React from 'react';
import ProductStore from "../../store/ProductStore.js";
//import {StarRatings} from "react-star-ratings";

const Reviews = () => {
    const {ReviewList} = ProductStore()
    return (
        <div>
            <ul className="list-group mt-4 list-group-flush">
                {ReviewList!==null?ReviewList.map((item,i) => {
                    return (
                        <li key={i} className="list-group-item">
                            <h6><i className="bi bi-person"></i>
                                {item['profile']['cus_name']}</h6>
                            {/*<StarRatings rating={parseFloat(item['rating'])} starRatedColor="red" starDimension="15px" starSpacing="2px" />*/}
                            <p>{item['des']}</p>
                        </li>
                    )
                }):(<span></span>)
                }


            </ul>
        </div>
    );
};

export default Reviews;