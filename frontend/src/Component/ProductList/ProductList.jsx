import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProductCard from "../ProductCard/ProductCard";
import "./ProductList.css";

const ProductList = ({ wishlist, setWishlist }) => {
  const { category } = useParams();
  const url = "http://localhost:8000";
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      let endpoint = url + "/api/product/getProduct";
      if (category) {
        endpoint = url + `/api/product/category/${category}`;
      }

      const res = await axios.get(endpoint);
      const fetchedProducts = res.data.data || [];

      if (fetchedProducts.length === 0) {
        toast.error("No products found");
      } else {
        toast.success("Products fetched successfully");
      }

      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.find((p) => p._id === product._id);
      if (exists) return prevWishlist.filter((p) => p._id !== product._id);
      return [...prevWishlist, product];
    });
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  return (
    <div className="product-list-wrapper">
      <h2 className="product-list-title">{category ? category.toUpperCase() : "Our Products"}</h2>
      <div className="product-list-grid">
        {products.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
            isFavorite={wishlist.some((p) => p._id === item._id)}
            toggleWishlist={toggleWishlist}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;