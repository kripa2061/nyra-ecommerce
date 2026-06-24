import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import ProductCard from "../ProductCard/ProductCard";
import './Search.css'
const Search = () => {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const url = "https://womendressing-backend.onrender.com";

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${url}/api/product/getProduct`,
        { withCredentials: true }
      );

      if (response.data) {
        setProducts(response.data.data || []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // FILTER PRODUCTS (IMPORTANT: derived state, NOT stored)
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="search-wrapper">
      <p>Search Products</p>

      <input
        type="text"
        value={search}
        placeholder="Search dresses, tops, shoes..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="search-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((item) => (
            <ProductCard key={item._id} product={item} 
            
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Search;