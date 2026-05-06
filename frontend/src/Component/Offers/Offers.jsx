import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './Offers.css';

const Offers = () => {
  const url = "http://localhost:8000";
  const navigate = useNavigate();
  const [newOffer, setOffer] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOffer = async () => {
    try {
      const response = await axios.get(`${url}/api/product/offers`, { withCredentials: true });
      if (response.data) {
        setOffer(response.data.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffer();
  }, []);

  if (loading) return <p className="of-center">Loading offers...</p>;
  if (newOffer.length === 0) return <p className="of-center">No offers found.</p>;

  return (
    <div className="of-wrapper">
      <h2 className="of-heading">New Offers</h2>
      <div className="of-grid">
        {newOffer.map((item) => (
          <div key={item._id} className="of-card" onClick={() => navigate(`/product/${item._id}`)}>
            <div className="of-image-box">
              <img src={item.images?.[0] || "/placeholder.png"} alt={item.name} className="of-image" />
              <span className="of-badge">{item.discountPercent}% OFF</span>
            </div>
            <div className="of-info">
              <p className="of-name">{item.name}</p>
              <p className="of-fabric">{item.fabric}</p>
              <div className="of-price-box">
                <p className="of-original-price">Rs. {item.price.toLocaleString()}</p>
                <p className="of-price">Rs. {item.discountedPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Offers;