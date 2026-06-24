import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets/assets'

const Navbar = () => {
  const [logout, setLogout] = useState(false)
  const toggleLogout = () => {
    setLogout(prev => !prev)
  }
  return (
    <div className="navbar">
      <div className="navbar-left">
        <p>NYRA</p>
        <img src={assets.logo} alt="" className="navbar-logo" />
      </div>

      <p className="admin-text" onClick={() => { toggleLogout() }} >Admin Panel</p>
      {logout && (
        <ul className="logout-dropdown">
          <li>Logout</li>
        </ul>
      )}
    </div>
  )
}

export default Navbar