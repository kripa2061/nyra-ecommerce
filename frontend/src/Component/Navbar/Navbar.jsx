import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <>


      <div className="navbar">
        {/* Logo */}
        <p className="navbar-logo">
          Nyra
          <img
            className="navbar-logo-img"
            src={assets.logo}
            alt="Nyra logo"
          />
        </p>

        {/* Menu */}
        <ul className="navbar-menu">
          <li>HOME</li>
          <li>PRODUCTS</li>
          <li>NEW ARRIVALS</li>
          <li>OFFERS</li>
        </ul>

        {/* Right actions */}
        <div className="navbar-actions">
          <ul className="navbar-icons">
            <li>
              <img className="wishlist" src={assets.wishlist} alt="Wishlist" />
            </li>
            <li>
              <img src={assets.cart} alt="Cart" />
            </li>
          </ul>

          <button className='button'>Sign up</button>
        </div>
      </div>
    </>
  )
}

export default Navbar
