import React from "react";
import "./ProductCard.css";
import { assets } from "../../assets/assets";

const ProductCard = ({ product, isFavorite, toggleWishlist }) => {
  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={product.images[0] || "/placeholder.png"}
          alt={product.name}
          className="product-image"
        />
      </div>
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <div className="price-wishlist">
          <p className="product-price">₹{product.price}</p>
          <img
            className="product-wishlist"
            src={isFavorite ? assets.love : assets.wishlist}
            onClick={() => toggleWishlist(product)}
            alt="wishlist"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;