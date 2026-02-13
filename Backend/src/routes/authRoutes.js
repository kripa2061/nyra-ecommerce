import express from "express";
import { register, verifyOTP, login } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/register", register);
router.post("/verify-otp", verifyOTP);
router.post("/login", login);

export default router;