import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const url = "http://localhost:8000";

  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(false);

  const profileRef = useRef();

  const authCheck = async () => {
    try {
      const response = await axios.get(`${url}/api/auth/getme`, {
        withCredentials: true,
      });

      setIsLoggedIn(response.data.loggedIn);
    } catch (error) {
      setIsLoggedIn(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/api/category/getCategory`, {
        withCredentials: true,
      });

      setCategories(response.data.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      toast.error("Failed to fetch categories");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${url}/api/auth/logout`, {}, { withCredentials: true });
      setIsLoggedIn(false);
      setProfile(false);
      toast.success("Logged out");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchCategories();
    authCheck();
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

        <li className="dropdown">
          <span>PRODUCTS</span>
          <ul className="dropdown-menu">
            {categories.map((item) => (
              <li key={item._id}>
                <Link to={`/products/${item.name.toLowerCase()}`}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li><Link to="/new-arrivals">NEW ARRIVALS</Link></li>
        <li><Link to="/offers">OFFERS</Link></li>
      </ul>

      {/* Right side */}
      <div className="navbar-actions">

        <ul className="navbar-icons">
          <li>
            <Link to="/wishlist">
              <img src={assets.wishlist} alt="Wishlist" />
            </Link>
          </li>

          <li >
        <Link to="/cart">    <img  src={assets.cart} alt="Cart" /></Link>
          </li>
        </ul>

        {/* AUTH */}
        {isLoggedIn ? (
          <div className="profile-circle" ref={profileRef}>
            <img
              src={assets.bow}
              alt="profile"
              onClick={() => setProfile(!profile)}
              
            />

            {profile && (
              <ul className="profile-dropdown">
                <li onClick={handleLogout} >Logout</li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="button">Sign up</button>
          </Link>
        )}

      </div>
    </div>
  );
};

export default Navbar;