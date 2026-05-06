import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import './Cart.css'
import { useNavigate } from 'react-router-dom'
const Cart = () => {
  const [cart, setCart] = useState([])
  const url = "http://localhost:8000"
const navigate=useNavigate()
  const getCart = async () => {
    try {
      const response = await axios.get(`${url}/api/cart/get`, { withCredentials: true })
      if (response.data.success) {
        setCart(response.data.cart || [])
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${url}/api/cart/remove/${productId}`,
        { withCredentials: true }
      )
      if (response.data.success) {
        setCart(response.data.cart || [])
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return
    try {
      const response = await axios.post(
        `${url}/api/cart/update`,
        { productId, quantity },
        { withCredentials: true }
      )
      if (response.data.success) {
        setCart(response.data.cart || [])
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const totalPrice = cart.reduce((acc, item) => acc + (item.product?.price * item.quantity), 0)

  useEffect(() => {
    getCart()
  }, [])

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
                  <img src={item.product?.images?.[0]} alt={item.product?.name} className="cart-img" />
                </div>
                <div className="cart-info">
                  <p className="cart-name">{item.product?.name}</p>
                  <p className="cart-price">₹{item.product?.price}</p>
                  <p className="cart-item-total">Total: ₹{item.product?.price * item.quantity}</p>
                  <div className="cart-qty">
                    <button onClick={() => updateQuantity(item.product?._id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.product?._id, item.quantity + 1)}>+</button>
                  </div>
                </div>
               <p className="cart-remove" onClick={() => removeFromCart(item.product?._id)}>⨯</p>
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
            <div className="promo-input-box">
              <input className="promo-input" placeholder="Promo code" />
              <button className="promo-btn">Apply</button>
            </div>
            <button onClick={(e)=>navigate("/checkout")} className="checkout-btn">Proceed to Checkout</button>
            <p className="secure-text">🔒 Secure & encrypted checkout</p>
          </div>
        </div>
      ) : (
        <div className="cart-empty">
          <span className="cart-empty-icon">🛍️</span>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything yet</p>
          <button className="continue-btn">Continue Shopping</button>
        </div>
      )}
    </div>
  )
}

export default Cart