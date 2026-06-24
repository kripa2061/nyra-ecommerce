import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StyleDetail.css";

const StyleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const url = "https://womendressing-backend.onrender.com";

  const [style, setStyle] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchStyle = async () => {
      try {
        const res = await axios.get(
          `${url}/api/style/getstyleById/${id}`,
          { withCredentials: true }
        );

        if (res.data?.data) {
          const data = res.data.data;

          data.sizes =
            typeof data.sizes === "string"
              ? data.sizes.split(",").map((s) => s.trim())
              : data.sizes || [];

          data.color =
            typeof data.color === "string"
              ? data.color.split(",").map((c) => c.trim())
              : data.color || [];

          data.images = data.images || [];

          setStyle(data);
        }
      } catch (err) {
        toast.error("Failed to fetch style");
      } finally {
        setLoading(false);
      }
    };

    fetchStyle();
  }, [id]);

  const addToCart = async () => {
    try {
      const response = await axios.post(
        `${url}/api/cart/add`,
        {
          styleId: id,
          quantity: 1,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        setCart(response.data.cart);
        toast.success("Added to cart");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (loading)
    return (
      <div className="sd-loading">
        <div className="sd-spinner"></div>
        <p>Loading look…</p>
      </div>
    );

  if (!style)
    return (
      <div className="sd-loading">
        <p>Style not found.</p>
      </div>
    );

  return (
    <div className="sd-wrapper">
      {/* LEFT */}
      <div className="sd-left">
        <div className="sd-main-img-box">
          <img
            src={style.images?.[selectedImage]}
            alt={style.name}
            className="sd-main-img"
          />

          <span className="sd-mood-badge">{style.mood}</span>

          <button
            className="sd-save-btn"
            onClick={() => {
              setSaved(!saved);
              toast.success(!saved ? "Saved" : "Removed");
            }}
          >
            {saved ? "❤️" : "🤍"}
          </button>
        </div>

        <div className="sd-thumbnails">
          {style.images?.map((img, i) => (
            <img
              key={i}
              src={img}
              className={`sd-thumb ${
                selectedImage === i ? "sd-thumb-active" : ""
              }`}
              onClick={() => setSelectedImage(i)}
              alt="thumb"
            />
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="sd-right">
        <p>{style.mood} Look</p>
        <h1>{style.name}</h1>

        <p>{style.category}</p>

        <h2>₹{style.price}</h2>

        {/* SIZES */}
        <div>
          <p>Sizes:</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {style.sizes.length > 0 ? (
              style.sizes.map((s, i) => (
                <button key={i} className="sd-size-btn">
                  {s}
                </button>
              ))
            ) : (
              <p>No sizes available</p>
            )}
          </div>
        </div>

        {/* COLORS */}
        <div>
          <p>Colors:</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {style.color.length > 0 ? (
              style.color.map((c, i) => (
                <div
                  key={i}
                  style={{
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    background: c,
                    border: "1px solid #ddd",
                  }}
                />
              ))
            ) : (
              <p>No colors available</p>
            )}
          </div>
        </div>

        {/* BUTTONS */}
        <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
          <button onClick={addToCart}>Add to Cart</button>
          <button onClick={() => navigate(-1)}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default StyleDetail;