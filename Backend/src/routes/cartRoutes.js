import express from "express";
import {
    addToCart,
    getCart,
    removeFromCart,
    clearCart,
    updateQuantity
} from "../controllers/cartController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.get("/get", authMiddleware, getCart);
router.delete("/remove/:productId", authMiddleware, removeFromCart);
router.post("/update", authMiddleware, updateQuantity);  
router.delete("/clear", authMiddleware, clearCart); 

export default router;
