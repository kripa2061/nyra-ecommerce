import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = () => {
  const { category } = useParams();
  const url = "http://localhost:8000";

  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);

const fetchProducts = async () => {
  try {
    let endpoint = `${url}/api/product/getProduct`;
    const config = { withCredentials: true };

    if (category) {
      endpoint = `${url}/api/product/category/${category}`;
    }

    const res = await axios.get(endpoint, config);
    setProducts(res.data.data || []);
  } catch (error) {
    toast.error("Failed to fetch products");
  }
};
  // FETCH WISHLIST FROM BACKEND
  const getWishlist = async () => {
    try {
      const res = await axios.get(`${url}/api/auth/getwishList`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setWishlist(res.data.wishlist || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // TOGGLE WISHLIST (BACKEND)
  const toggleWishlist = async (product) => {
    try {
      const res = await axios.post(
        `${url}/api/auth/wishlist`,
        { productId: product._id },
        { withCredentials: true }
      );

      if (res.data.success) {
        setWishlist(res.data.wishlist || []);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Wishlist error");
    }
  };

  useEffect(() => {
    fetchProducts();
    getWishlist(); // 🔥 important
  }, [category]);

  return (
    <div className="product-list-wrapper">
      <h2 className="product-list-title">
        {category ? category.toUpperCase() : "Our Products"}
      </h2>

      <div className="product-list-grid">
        {products.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
            isFavorite={wishlist.some((p) => (p._id || p) === item._id)}
            toggleWishlist={() => toggleWishlist(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;