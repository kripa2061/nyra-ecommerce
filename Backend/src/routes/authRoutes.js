import express from "express";
import {  wishList, getWishList, Register, sendVerifyOtp, Login, Logout, getMe, getUser } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";

const router = express.Router();
router.post("/register", Register);
router.post("/verify-otp", sendVerifyOtp);
router.post("/login", Login);
router.get("/getme",getMe);
router.get("/getUser",getUser);
router.post("/logout",Logout)
router.post("/wishlist",authMiddleware,wishList);
router.get("/getwishList",authMiddleware,getWishList);
export default router;