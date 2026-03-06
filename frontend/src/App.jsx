import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Component/Navbar/Navbar";
import Home from './Pages/Home';
import ProductList from './Component/ProductList/ProductList';
import Wishlist from './Component/WishList/Wishlist';

const App = () => {
  const [wishlist, setWishlist] = useState([]);

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/product" element={<ProductList wishlist={wishlist} setWishlist={setWishlist} />} />
        <Route path="/wishlist" element={<Wishlist wishlist={wishlist} setWishlist={setWishlist} />} />
      </Routes>
    </div>
  );
};

export default App;