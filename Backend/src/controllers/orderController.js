import orderModel from "../models/orderModel.js";
import axios from "axios";

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { userId, items,   paymentStatus, amount, address } = req.body;
    if (!userId || !items || !amount || !address) {
      return res.status(401).json({ message: "Missing value" });
    }

    const order = new orderModel({
      userID: userId,
      items,
        paymentStatus:paymentStatus,
      amount,
      address,
      paymentStatus: "pending"
    });

    await order.save();
    return res.status(200).json({ message: "Order placed successfully", order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: -1 });
    return res.status(200).json({ data: orders });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderModel.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json({ data: order });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Delete order by ID
const removeOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const order = await orderModel.findByIdAndDelete(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    return res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Verify eSewa payment
const verifyEsewaPayment = async (req, res) => {
  try {
    const { orderId, esewaAmt, esewaRefId } = req.body;

    if (!orderId || !esewaAmt || !esewaRefId) {
      return res.status(400).json({ message: "Missing payment data" });
    }

    const order = await orderModel.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (process.env.NODE_ENV === "development") {
      order.paymentStatus = "paid";
      await order.save();
      return res.status(200).json({
        message: "Payment verified successfully ",
        order,
        mock: true
      });
    }

    const params = new URLSearchParams();
    params.append("amt", esewaAmt);
    params.append("scd", process.env.ESEWA_MERCHANT_ID);
    params.append("pid", orderId);
    params.append("rid", esewaRefId);

    const { data } = await axios.post(
      "https://esewa.com.np/epay/transrec",
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    console.log("eSewa verification response:", data);

    if (data.includes("<response_code>Success</response_code>")) {
      order.paymentStatus = "paid";
      await order.save();
      return res.status(200).json({
        message: "Payment verified successfully",
        order
      });
    } else {
      order.paymentStatus = "failed";
      await order.save();
      return res.status(400).json({
        message: "Payment verification failed",
        order,
        esewaResponse: data
      });
    }

  } catch (error) {
    console.error("Payment verification error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

export default {
  placeOrder,
  getOrders,
  getOrderById,
  removeOrder,
  verifyEsewaPayment
};
