import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const url = "http://localhost:8000";

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [review, setReview] = useState([]);
  const [cart, setCart] = useState([]);

  // ✅ ADDED (needed for your addReviews function)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const fetchProductDetail = async () => {
    try {
      const response = await axios.get(
        `${url}/api/product/getProductbyid/${id}`
      );
      if (response.data) {
        setProduct(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch product");
      console.log(error);
    }
  };

  const addReviews = async () => {
    try {
      const response = await axios.post(
        `${url}/api/product/addReview`,
        { productId: id, rating, comment },
        { withCredentials: true }
      );

      if (response.data) {
        toast.success("Review added!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchReview = async () => {
    try {
      const response = await axios.get(
        `${url}/api/product/getReview/${id}`,
        { withCredentials: true }
      );

      if (response.data) {
        setReview(response.data.reviews);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addToCart = async () => {
    if (!selectedSize) return toast.warning("Please select a size");
    if (!selectedColor) return toast.warning("Please select a color");

    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        { productId: id, size: selectedSize, color: selectedColor },
        { withCredentials: true }
      );

      if (response.data) {
        setCart(response.data.cart);
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProductDetail();
    fetchReview();
  }, [id]);

  if (!product) {
    return (
      <div className="pd-loading">
        <div className="pd-spinner"></div>
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <>
      <div className="pd-wrapper">
        <div className="pd-left">
          <div className="pd-main-img-box">
            <img
              src={product.images?.[selectedImage]}
              alt={product.name}
              className="pd-main-img"
            />
          </div>

          <div className="pd-thumbnails">
            {product.images?.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`thumb-${i}`}
                className={`pd-thumb ${
                  selectedImage === i ? "pd-thumb-active" : ""
                }`}
                onClick={() => setSelectedImage(i)}
              />
            ))}
          </div>
        </div>

        <div className="pd-right">
          <p className="pd-category">{product.category}</p>
          <h1 className="pd-name">{product.name}</h1>

          <div className="pd-price-row">
            {product.isOffer && product.discountPercent > 0 ? (
              <>
                <span className="pd-original-price">₹{product.price}</span>
                <span className="pd-price">
                  ₹
                  {Math.round(
                    product.price -
                      (product.price * product.discountPercent) / 100
                  )}
                </span>
                <span className="pd-discount-badge">
                  {product.discountPercent}% OFF
                </span>
              </>
            ) : (
              <span className="pd-price">₹{product.price}</span>
            )}

            {product.stock > 0 ? (
              <span className="pd-badge in-stock">In Stock</span>
            ) : (
              <span className="pd-badge out-stock">Out of Stock</span>
            )}
          </div>

          <p className="pd-description">{product.description}</p>

          <div className="pd-divider" />

          <div className="pd-meta">
            <div className="pd-meta-item">
              <span className="pd-meta-label">Fabric</span>
              <span className="pd-meta-value">{product.fabric}</span>
            </div>
            <div className="pd-meta-item">
              <span className="pd-meta-label">Stock</span>
              <span className="pd-meta-value">{product.stock} left</span>
            </div>
          </div>

          <div className="pd-divider" />

          <div className="pd-section">
            <p className="pd-section-label">Select Size</p>
            <div className="pd-sizes">
              {product.sizes?.map((size, i) => (
                <button
                  key={i}
                  className={`pd-size-btn ${
                    selectedSize === size ? "pd-size-active" : ""
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="pd-section">
            <p className="pd-section-label">Select Color</p>
            <div className="pd-colors">
              {product.colors?.map((color, i) => (
                <div
                  key={i}
                  className={`pd-color-dot ${
                    selectedColor === color ? "pd-color-active" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>

          <div className="pd-buttons">
            <button onClick={addToCart} className="pd-cart-btn">
              Add to Cart
            </button>
            <button className="pd-buy-btn">Buy Now</button>
          </div>
        </div>
      </div>

      <div className="pd-reviews">
        <h2 className="pd-reviews-title">Customer Reviews</h2>

        {review.length > 0 ? (
          review.map((item) => (
            <div key={item._id} className="pd-review-card">
              <p className="pd-reviewer-name">
                {item.userId?.name || "Anonymous"}
              </p>

              <p className="pd-review-rating">
                {"⭐".repeat(item.rating)}
              </p>

              <p className="pd-review-comment">{item.comment}</p>
            </div>
          ))
        ) : (
          <p className="pd-no-reviews">
            No reviews yet. Be the first to review!
          </p>
        )}

        {/* OPTIONAL UI USAGE (already needed for your API) */}
        <div className="pd-add-review">
          <div>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{ cursor: "pointer" }}
              >
                {rating >= star ? "⭐" : "☆"}
              </span>
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write review..."
          />

          <button onClick={addReviews}>Submit Review</button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;