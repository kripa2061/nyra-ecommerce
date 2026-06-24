import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import { User, ShoppingCart, LineChart, Package } from "lucide-react";
import ProductDisplay from "../ProductDisplay/ProductDisplay";

const Dashboard = () => {
  const [data, setData] = useState({
    totalUser: 0,
    totalOrder: 0,
    totalProduct: 0,
    totalRevenue: 0,
  });

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/admin/getDashboard"
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

 return (
  <div className="dashboard">

    {/* TOP CARDS */}
    <div className="dashboard-cards">

      <div className="dashboard-card">
        <div className="card-top">
          <div className="icon-title">
            <User size={20} />
            <p>Total Users</p>
          </div>
        </div>
        <h2>{data.totalUser}</h2>
      </div>

      <div className="dashboard-card">
        <div className="card-top">
          <div className="icon-title">
            <ShoppingCart size={20} />
            <p>Total Orders</p>
          </div>
        </div>
        <h2>{data.totalOrder}</h2>
      </div>

      <div className="dashboard-card">
        <div className="card-top">
          <div className="icon-title">
            <LineChart size={20} />
            <p>Total Revenue</p>
          </div>
        </div>
        <h2>₹{data.totalRevenue}</h2>
      </div>

      <div className="dashboard-card">
        <div className="card-top">
          <div className="icon-title">
            <Package size={20} />
            <p>Total Products</p>
          </div>
        </div>
        <h2>{data.totalProduct}</h2>
      </div>

    </div>

    {/* PRODUCT SECTION */}
    <div className="product-display">
      <ProductDisplay />
    </div>

  </div>
);
};

export default Dashboard;