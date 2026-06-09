import React, { useEffect } from 'react';
import ProductsStore from '../../store/ProductStore.js';
import SliderSkeleton from "../../skeleton/slider-skeleton.jsx";
import { Link } from "react-router-dom";

const Slider = () => {
    const { SliderList } = ProductsStore();

    useEffect(() => {
        if (SliderList && SliderList.length > 0) {
            // Wait for DOM to be ready
            const timer = setTimeout(() => {
                const carouselEl = document.querySelector('#carouselExampleDark');
                if (carouselEl && window.bootstrap) {
                    const carousel = new window.bootstrap.Carousel(carouselEl, {
                        interval: 3000,
                        ride: 'carousel',
                        wrap: true
                    });
                    carousel.cycle(); // Start auto-sliding
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [SliderList]); // Runs when SliderList loads

    if (SliderList === null) {
        return <SliderSkeleton />;
    }

    return (
        <div>
            <div id="carouselExampleDark" className="carousel hero-bg carousel-dark slide">
                <div className="carousel-indicators">
                    {SliderList.map((item, index) => (
                        <button
                            key={index}
                            type="button"
                            data-bs-target="#carouselExampleDark"
                            data-bs-slide-to={index}
                            className={index === 0 ? "active" : ""}
                            aria-current={index === 0 ? "true" : undefined}
                            aria-label={`Slide ${index + 1}`}
                        />
                    ))}
                </div>
                <div className="carousel-inner py-5">
                    {SliderList.map((item, index) => (
                        <div key={index} className={`carousel-item${index === 0 ? " active" : ""}`}>
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                        <h1 className="headline-1">{item['title']}</h1>
                                        <p>{item['des']}</p>
                                        <Link to="" className="btn text-white btn-success px-5">Buy Now</Link>
                                    </div>
                                    <div className="col-12 col-lg-5 col-sm-12 col-md-5 p-5">
                                        <img src={item['image']} className="w-100" alt="img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button className="carousel-control-prev btn rounded-5" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next btn" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    );
};

export default Slider;