import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductDisplay.css";
import { useNavigate } from "react-router-dom";

const ProductDisplay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate=useNavigate()
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/api/product/getProduct"
      );
      setProducts(res.data.data || []);
    } catch (err) {
      setError("Oops! Could not load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();

  }, []);

  if (loading) return <h3 className="status">Loading your collection...</h3>;
  if (error) return <h3 className="status error">{error}</h3>;

  return (
    <div className="product-page">
      <h2 className="title">✨ Your NYRA Collection</h2>

      {products.length === 0 ? (
        <p className="empty">No pieces added yet 💗</p>
      ) : (
        <div className="product-grid"  >
          {products.map((p) => (
             <div
      className="product-card"
      key={p._id}
      onClick={() => navigate(`/productDetail/${p._id}`)}
    >
            <div className="product-card" key={p._id}>
              <div className="img-box">
                <img src={p.images} alt={p.name} />
              </div>

              <div className="info">
                <h3>{p.name}</h3>
                <p className="price">Rs {p.price}</p>
                <p className="desc">{p.description}</p>
              </div>
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductDisplay;