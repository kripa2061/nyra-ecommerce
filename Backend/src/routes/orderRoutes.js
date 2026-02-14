import express from 'express'
import orderController from '../controllers/orderController.js';
const {placeOrder,getOrders,getOrderById,removeOrder}=orderController
const orderRouter=express.Router();
orderRouter.post("/placeOrder",placeOrder);
orderRouter.get("/getOrder",getOrders);
orderRouter.get("/getOrderById/:id",getOrderById);
orderRouter.delete("/removeOrder/:id",removeOrder)
orderRouter.post("/payment/verify", orderController.verifyEsewaPayment);
export default orderRouter;
