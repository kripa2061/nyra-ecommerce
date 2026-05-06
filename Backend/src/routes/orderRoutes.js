import express from 'express'
import orderController from '../controllers/orderController.js';
import authMiddleware from '../middleware/authMiddleware.js'
const {placeOrder,getOrders,getOrderById,removeOrder}=orderController


const orderRouter=express.Router();
orderRouter.post("/placeOrder",authMiddleware,placeOrder);
orderRouter.get("/getOrder",authMiddleware,getOrders);
orderRouter.get("/getOrderById/:id",authMiddleware,getOrderById);
orderRouter.delete("/removeOrder/:id",authMiddleware,removeOrder)
orderRouter.post("/payment/verify",authMiddleware, orderController.verifyEsewaPayment);
export default orderRouter;
