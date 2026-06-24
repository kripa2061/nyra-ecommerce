import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './NewArrival.css';

const NewArrival = () => {
  const url = "https://womendressing-backend.onrender.com";
  const navigate = useNavigate();
  const [newArrival, setNewArrival] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewArrival = async () => {
    try {
      const response = await axios.get(`${url}/api/product/newArrival`, { withCredentials: true });
      if (response.data) {
        setNewArrival(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrival();
  }, []);

  if (loading) return <p className="na-center">Loading new arrivals...</p>;
  if (newArrival.length === 0) return <p className="na-center">No new arrivals found.</p>;

  return (
    <div className="na-wrapper">
      <h2 className="na-heading">New Arrivals</h2>
      <div className="na-grid">
        {newArrival.map((item) => (
          <div key={item._id} className="na-card" onClick={() => navigate(`/product/${item._id}`)}>
            <div className="na-image-box">
              <img src={item.images?.[0] || "/placeholder.png"} alt={item.name} className="na-image" />
              <span className="na-badge">New</span>
            </div>
            <div className="na-info">
              <p className="na-name">{item.name}</p>
              <p className="na-fabric">{item.fabric}</p>
              <p className="na-price">Rs. {item.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrival;