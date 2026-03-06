import React, { useEffect, useState } from "react";
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const url = "http://localhost:8000";
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/category/getCategory`);
      setCategories(response.data.data);
      toast.success("Categories fetched");
    } catch (err) {
      console.error("Error fetching categories:", err);
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="navbar">
      {/* Logo */}
      <p className="navbar-logo">
        Nyra
        <img className="navbar-logo-img" src={assets.logo} alt="Nyra logo" />
      </p>

      {/* Menu */}
      <ul className="navbar-menu">
        <li><Link to="/">HOME</Link></li>

        {/* Products Dropdown */}
        <li className="dropdown">
          <span>PRODUCTS</span>
          <ul className="dropdown-menu">
            {categories.map((item) => (
              <li key={item._id}>
                <Link to={`/products/${item.name.toLowerCase()}`}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </li>

        <li><Link to="/new-arrivals">NEW ARRIVALS</Link></li>
        <li><Link to="/offers">OFFERS</Link></li>
      </ul>

      {/* Right actions */}
      <div className="navbar-actions">
        <ul className="navbar-icons">
          <li>
            <Link to="/wishlist">
              <img className="wishlist-icon" src={assets.wishlist} alt="Wishlist" />
            </Link>
          </li>
          <li>
            <img src={assets.cart} alt="Cart" />
          </li>
        </ul>
        <button className='button'>Sign up</button>
      </div>
    </div>
  );
};

export default Navbar;