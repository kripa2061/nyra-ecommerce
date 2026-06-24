import React from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Component/Layout/Layout";

import AddProduct from "./Component/Add Product/AddProduct";
import Mood from "./Component/AddMood/Mood";
import User from "./Component/User/User";
import Home from "./Pages/Home/Home";
import ProductDisplay from "./Component/ProductDisplay/ProductDisplay";
import ProductDetail from "./Component/ProductDetail/ProductDetail";


const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/mood" element={<Mood />} />
        <Route path="/users" element={<User />} />
        <Route path="/products" element={<ProductDisplay />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
      </Route>
    </Routes>
  )
};

export default App;