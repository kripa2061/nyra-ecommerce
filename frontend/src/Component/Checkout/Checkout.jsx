// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const Checkout = () => {
//   const url = "https://womendressing-backend.onrender.com";
//   const navigate = useNavigate();

//   const [order, setOrder] = useState(null);       // stores the order object
//   const [loading, setLoading] = useState(true);   // shows loading state
//   const [status, setStatus] = useState(null);     // "paid" | "failed"

//   const verifyPayment = async () => {
//     try {
//       // ✅ Step 1: Read query params eSewa sends back in the URL
//       // e.g. /checkout?oid=ORDER_ID&amt=500&refId=ABC123
//       const params = new URLSearchParams(window.location.search);
//       const orderId  = params.get("oid");    // eSewa sends order id as "oid"
//       const esewaAmt = params.get("amt");    // amount
//       const esewaRefId = params.get("refId"); // eSewa reference id

//       // ✅ Step 2: Guard — if no params, something went wrong
//       if (!orderId || !esewaAmt || !esewaRefId) {
//         toast.error("Invalid payment callback. Missing parameters.");
//         setStatus("failed");
//         setLoading(false);
//         return;
//       }

//       // ✅ Step 3: Send to backend for verification
//       // withCredentials goes in the CONFIG (3rd arg), NOT in the body (2nd arg)
//       const response = await axios.post(
//         `${url}/api/order/payment/verify`,
//         { orderId, esewaAmt, esewaRefId },  // request body
//         { withCredentials: true }            // axios config
//       );

//       // ✅ Step 4: Handle response
//       if (response.data && response.data.order) {
//         setOrder(response.data.order);
//         setStatus(response.data.order.paymentStatus); // "paid" or "failed"

//         if (response.data.order.paymentStatus === "paid") {
//           toast.success("Payment verified successfully!");
//         } else {
//           toast.error("Payment failed. Please try again.");
//         }
//       }

//     } catch (error) {
//       // Axios errors have response.data for server errors
//       const msg = error.response?.data?.message || error.message;
//       toast.error(msg);
//       setStatus("failed");
//     } finally {
//       setLoading(false); // always stop loading
//     }
//   };

//   useEffect(() => {
//     verifyPayment();
//   }, []); // runs once on mount — perfect for a redirect-back page

//   // ── UI ──────────────────────────────────────────────────────────────

//   if (loading) {
//     return (
//       <div style={styles.center}>
//         <p>Verifying your payment, please wait...</p>
//       </div>
//     );
//   }

//   if (status === "paid") {
//     return (
//       <div style={styles.center}>
//         <h2 style={{ color: "green" }}>✅ Payment Successful!</h2>
//         {order && (
//           <div style={styles.card}>
//             <p><strong>Order ID:</strong> {order._id}</p>
//             <p><strong>Amount:</strong> Rs. {order.amount}</p>
//             <p><strong>Status:</strong> {order.paymentStatus}</p>
//             <h4>Items:</h4>
//             <ul>
//               {order.items.map((item, i) => (
//                 <li key={i}>{item.name} × {item.quantity}</li>
//               ))}
//             </ul>
//           </div>
//         )}
//         <button onClick={() => navigate("/orders")}>View My Orders</button>
//       </div>
//     );
//   }

//   // Payment failed
//   return (
//     <div style={styles.center}>
//       <h2 style={{ color: "red" }}>❌ Payment Failed</h2>
//       <p>Your payment could not be verified. Please try again.</p>
//       <button onClick={() => navigate("/cart")}>Back to Cart</button>
//     </div>
//   );
// };

// const styles = {
//   center: {
//     display: "flex", flexDirection: "column",
//     alignItems: "center", justifyContent: "center",
//     minHeight: "60vh", gap: "12px"
//   },
//   card: {
//     border: "1px solid #ddd", borderRadius: "8px",
//     padding: "20px", minWidth: "300px"
//   }
// };

// export default Checkout;
import React from 'react'

const Checkout = () => {
  return (
    <div>
      
    </div>
  )
}

export default Checkout
