import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Component/Navbar/Navbar";
import Home from './Pages/Home';
import ProductList from './Component/ProductList/ProductList';
import Wishlist from './Component/WishList/Wishlist';
import Loginpage from "./Component/LoginPage/Loginpage";
import ProductDetail from "./Component/ProductDetail/ProductDetail";
import Cart from "./Component/Cart/Cart";
import Checkout from "./Component/Checkout/Checkout";
import NewArrival from "./Component/NewArrival/NewArrival";
import Offers from "./Component/Offers/Offers";

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
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/new-arrivals" element={<NewArrival />} />
        <Route path="/offers" element={< Offers/>} />
      </Routes>
    </div>
  );
};

export default App;