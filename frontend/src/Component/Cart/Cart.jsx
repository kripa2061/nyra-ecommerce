import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const url = "https://womendressing-backend.onrender.com";
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      const res = await axios.get(`${url}/api/cart/get`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setCart(res.data.cart || []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeFromCart = async (item) => {
    try {
      const res = await axios.post(
        `${url}/api/cart/remove`,
        {
          productId: item.product?._id,
          styleId: item.style?._id,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setCart(res.data.cart || []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const updateQuantity = async (item, quantity) => {
    if (quantity < 1) return;

    try {
      const res = await axios.post(
        `${url}/api/cart/update`,
        {
          productId: item.product?._id,
          styleId: item.style?._id,
          quantity,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        setCart(res.data.cart || []);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getPrice = (item) => {
    if (item.product) return item.product.price;
    if (item.style) return item.style.price;
    return 0;
  };

  const getImage = (item) => {
    if (item.product) return item.product.images?.[0];
    if (item.style) return item.style.images?.[0];
    return "";
  };

  const getName = (item) => {
    if (item.product) return item.product.name;
    if (item.style) return item.style.name;
    return "";
  };

  const totalPrice = cart.reduce(
    (acc, item) => acc + getPrice(item) * item.quantity,
    0
  );

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="cart-wrapper">
      <h2 className="cart-title">My Cart</h2>
      <p className="cart-subtitle">Your selected pieces</p>

      {cart.length > 0 ? (
        <div className="cart-container">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item._id} className="cart-card">
                <div className="cart-img-box">
                  <img
                    src={getImage(item)}
                    alt={getName(item)}
                    className="cart-img"
                  />
                </div>

                <div className="cart-info">
                  <p className="cart-name">{getName(item)}</p>

                  <p className="cart-price">₹{getPrice(item)}</p>

                  <p className="cart-item-total">
                    Total: ₹{getPrice(item) * item.quantity}
                  </p>

                  <div className="cart-qty">
                    <button
                      onClick={() =>
                        updateQuantity(item, item.quantity - 1)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <p
                  className="cart-remove"
                  onClick={() => removeFromCart(item)}
                >
                  ⨯
                </p>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">Order Summary</h3>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>₹200</span>
            </div>

            <div className="summary-divider" />

            <div className="summary-row total">
              <span>Total</span>
              <span>₹{totalPrice}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="checkout-btn"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <span className="cart-empty-icon">🛍️</span>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet</p>

          <button
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;