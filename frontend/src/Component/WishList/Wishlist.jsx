import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { toast } from "react-toastify";
import axios from "axios";
import './Wishlist.css'
const Wishlist = () => {
  const url = "https://womendressing-backend.onrender.com";
  const [wishlist, setWishlist] = useState([]);

  const getWishList = async () => {
    try {
      const res = await axios.get(`${url}/api/auth/getwishList`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setWishlist(res.data.wishlist || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const toggleWishlist = async (productId) => {
    try {
      const res = await axios.post(
        `${url}/api/auth/wishlist`,
        { productId },
        { withCredentials: true }
      );

      if (res.data.success) {
        setWishlist(res.data.wishlist || []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getWishList();
  }, []);

  return (
  <div className="wishlist-container">
    {wishlist.length === 0 ? (
      <p className="wishlist-empty">Your wishlist is empty.</p>
    ) : (
      <>
        <h2 className="wishlist-title">Your WishList</h2>

        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
              isFavorite={true}
              toggleWishlist={() => toggleWishlist(item._id)}
            />
          ))}
        </div>
      </>
    )}
  </div>
);
};

export default Wishlist;