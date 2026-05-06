import express from "express";
import multer from "multer";
import { addCategory, getCategory, deleteCategory, updateCategory } from "../controllers/categoryController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/addCategory", authMiddleware,   addCategory);
router.put("/updateCategory/:id", authMiddleware, roleMiddleware("admin"), upload.single("image"), updateCategory);
router.get("/getCategory",authMiddleware, getCategory);
router.delete("/deleteCategory/:id", deleteCategory);

export default router;