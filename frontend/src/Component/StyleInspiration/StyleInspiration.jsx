import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./StyleInspiration.css";
import { useNavigate } from "react-router-dom";

const StyleInspiration = () => {
  const url = "https://womendressing-backend.onrender.com";
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMood, setActiveMood] = useState("All");
  const navigate = useNavigate();

  const MOODS = [
    "All",
    "Date Night",
    "Office",
    "Traditional",
    "Festive",
    "Casual",
    "Brunch",
    "Vacation",
    "Wedding Guest",
  ];

  const fetchStyles = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${url}/api/style/getstyle`, {
        withCredentials: true,
      });

      setStyles(res.data?.data || []);
    } catch (error) {
      toast.error(error.message);
      setStyles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStyles();
  }, []);

  const filtered =
    activeMood === "All"
      ? styles
      : styles.filter(
          (s) =>
            s.mood?.toLowerCase() === activeMood.toLowerCase()
        );

  return (
    <div className="style-page">
      <div className="style-header">
        <h1 className="style-heading">Style Inspiration</h1>
        <p className="style-subheading">CURATED LOOKS BY NYRA</p>
      </div>

      {/* Mood filter */}
      <div className="style-mood-row">
        {MOODS.map((mood) => (
          <button
            key={mood}
            onClick={() => setActiveMood(mood)}
            className={`style-mood-btn ${activeMood === mood ? "active" : ""}`}
          >
            {mood}
          </button>
        ))}
      </div>

      {loading && <div className="style-loading">Loading looks...</div>}

      {!loading && filtered.length === 0 && (
        <div className="style-empty">
          <p>🌸 No looks found for <strong>{activeMood}</strong></p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className="style-grid">
          {filtered.map((item) => (
            <div
              key={item._id}
              className="style-card"
              onClick={() => navigate(`/style/${item._id}`)}
            >
              <div className="style-card-img-wrap">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="style-card-img"
                />
                <span className="style-card-mood-badge">{item.mood}</span>
              </div>

              <div className="style-card-info">
                <p className="style-card-name">{item.name}</p>

                <p className="style-card-category">
                  {item.category || "Complete Look"}
                </p>

                <div className="style-card-footer">
                  <p className="style-card-price">
                    ₹{item.price?.toLocaleString()}
                  </p>

                  <button
                    className="style-card-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/style/${item._id}`);
                    }}
                  >
                    Shop Look
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StyleInspiration;