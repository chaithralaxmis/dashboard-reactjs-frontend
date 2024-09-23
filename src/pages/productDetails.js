import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getAProduct } from "../utils/apiFunction";
import { useNavigate, useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import { jwtDecode } from "jwt-decode";

const ProductDetails = () => {
  const productSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const productSmlSliderOptions = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
  };

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    } else {
      localStorage.removeItem("token");
      navigate("/login");
    }

    const getProduct = async () => {
      try {
        const res = await getAProduct(id);
        if (res.data.status === "ok") {
          setProduct(res.data.data);
          setSelectedImage(res.data.data.images[0]?.url || null);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id, navigate]);

  const handleImageSelect = (url) => {
    setSelectedImage(url);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="right-content w-100">
      <div className="card">
        <div className="row">
          <div className="col-md-4">
            <div className="slider-wrapper pt-3 pb-3 pl-4 pr-4">
              <h6 className="mb-3">Product Gallery</h6>
              <Slider {...productSliderOptions} className="slider-big">
                <div className="item">
                  <img src={selectedImage} className="w-100" alt="product" />
                </div>
              </Slider>
              <Slider {...productSmlSliderOptions} className="slider-small">
                {product?.images.map((image) => (
                  <div
                    className="item"
                    key={image._id}
                    onClick={() => handleImageSelect(image.url)}
                  >
                    <img src={image.url} className="w-100" alt="product" />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="col-md-8 p-3">
            <h4>{product?.title}</h4>
            <Rating name="read-only" value={product?.totalRatings} readOnly />
            <p className="mt-3">{product?.description}</p>
            <div className="row mt-3">
              <div className="col-lg-6 col-md-6 col-sm-12">
                Price <h6>{product?.price} Rs</h6>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                Quantity <h6>{product?.quantity}</h6>
              </div>
            </div>
            <div className="mt-3">Colors</div>
            <div className="d-flex flex-wrap">
              {product?.color.map((color) => (
                <div
                  className="productdetails-color-box"
                  style={{ background: color.color }}
                  key={color._id}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
