import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import { assets } from "../../assets/assets";

const ProductCard = ({ product, isFavorite, toggleWishlist }) => {
  const navigate = useNavigate();

  const imageSrc = product?.images?.[0] || "/placeholder.png";

  const goToDetail = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="product-card" onClick={goToDetail}>
      <div className="product-image-wrapper">
        <img src={imageSrc} alt={product?.name} className="product-image" />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product?.name}</h3>

        <div className="price-wishlist">
          <p className="product-price">₹{product?.price}</p>

          <img
            className="product-wishlist"
            src={isFavorite ? assets.love : assets.wishlist}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            alt="wishlist"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;