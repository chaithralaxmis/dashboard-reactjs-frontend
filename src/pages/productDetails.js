import React from "react";
import { AiFillHome } from "react-icons/ai";
import Slider from "react-slick";
const ProductDetails = () => {
  var productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  var productSmlSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="card d-flex justify-content-between flex-row p-3">
          <div>Product Details</div>
          <div>
            <span>
              <AiFillHome /> Dashboard
            </span>
            /<span>Product details</span>
          </div>
        </div>
        <div className="card">
          <div className="row">
            <div className="col-md-4 ">
              <div className="slider-wrapper pt-3 pb-3 pl-4 pr-4">
                <h6 className="mb-3">Product Gallery</h6>
                <Slider {...productSliderOptions} className="slider-big">
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                      className="w-100"
                    />
                  </div>
                </Slider>
                <Slider {...productSmlSliderOptions} className="slider-small">
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/01.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/02.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/03.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/04.webp"
                      className="w-100"
                    />
                  </div>
                  <div className="item">
                    <img
                      src="https://mironcoder-hotash.netlify.app/images/product/single/05.webp"
                      className="w-100"
                    />
                  </div>
                </Slider>
              </div>
            </div>
            <div className="col-md-8"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
