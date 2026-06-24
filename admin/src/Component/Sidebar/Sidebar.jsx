import React from 'react'
import './Sidebar.css'
import {Link } from 'react-router-dom'
import {
  LayoutDashboard,
  PlusSquare,
  Users,
  Sparkles,
} from "lucide-react";
import { assets } from '../../assets/assets/assets';

const Sidebar = () => {
  return (
    <div className="sidebar">



      <div className="sidebar-links">

     <Link to="/" > <div className="sidebar-item active">
          <LayoutDashboard size={20} />
          <span>Dashboard</span>
        </div></Link> 

        <Link to="/add-product">   <div className="sidebar-item">
          <PlusSquare size={20} />
          <span>Add Product</span>
        </div></Link>

      <Link to="/users"><div className="sidebar-item">
          <Users size={20} />
          <span>Users</span>
        </div></Link>  

       <Link to="/mood"> <div className="sidebar-item">
          <Sparkles size={20} />
          <span>Mood</span>
        </div></Link> 
        
   <Link to="/products"> <div className="sidebar-item">
          <Sparkles size={20} />
          <span>Products</span>
        </div></Link> 

      </div>

    </div>
  )
}

export default Sidebar