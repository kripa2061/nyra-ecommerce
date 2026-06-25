import React, { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const url = "https://womendressing-backend.onrender.com";

  const [categories, setCategories] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(false);

  const profileRef = useRef(null);

  const authCheck = async () => {
    try {
      const response = await axios.get(`${url}/api/auth/getme`);

      setIsLoggedIn(response.data.loggedIn);
    } catch {
      setIsLoggedIn(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${url}/api/category/getCategory`
      );

      setCategories(response.data.data || []);
    } catch {
      toast.error("Failed to fetch categories");
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${url}/api/auth/logout`);

      setIsLoggedIn(false);
      setProfile(false);

      localStorage.setItem("authChanged", Date.now());

      toast.success("Logged out");
    } catch {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    fetchCategories();
    authCheck();
  }, []);

  useEffect(() => {
    const syncAuth = () => {
      authCheck();
    };

    window.addEventListener("storage", syncAuth);

    return () => {
      window.removeEventListener("storage", syncAuth);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfile(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <div className="navbar">
      <p className="navbar-logo">
        Nyra
        <img
          className="navbar-logo-img"
          src={assets.logo}
          alt="logo"
        />
      </p>

      <ul className="navbar-menu">
        <li>
          <Link to="/">HOME</Link>
        </li>

        <li className="dropdown">
          <span>PRODUCTS</span>

          <ul className="dropdown-menu">
            {categories.map((item) => (
              <li key={item._id}>
                <Link
                  to={`/products/${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </li>

        <li>
          <Link to="/style-inspiration">
            FIND MY STYLE
          </Link>
        </li>

        <li>
          <Link to="/new-arrivals">
            NEW ARRIVALS
          </Link>
        </li>

        <li>
          <Link to="/offers">OFFERS</Link>
        </li>
      </ul>

      <div className="navbar-actions">
        <ul className="navbar-icons">
          <li>
            <Link to="/search">
              <img
                src={assets.search}
                alt="search"
              />
            </Link>
          </li>

          <li>
            <Link to="/wishlist">
              <img
                src={assets.wishlist}
                alt="wishlist"
              />
            </Link>
          </li>

          <li>
            <Link to="/cart">
              <img src={assets.cart} alt="cart" />
            </Link>
          </li>
        </ul>

        {isLoggedIn ? (
          <div
            className="profile-circle"
            ref={profileRef}
          >
            <img
              src={assets.bow}
              alt="profile"
              onClick={() =>
                setProfile(!profile)
              }
            />

            {profile && (
              <ul className="profile-dropdown">
                <li onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="button">
              Sign up
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;