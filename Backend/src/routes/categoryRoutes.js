import express from "express";
import multer from "multer";
import { addCategory, getCategory, deleteCategory, updateCategory } from "../controllers/categoryController.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/addCategory", authMiddleware, roleMiddleware("admin"), upload.single("image"), addCategory);
router.put("/updateCategory/:id", authMiddleware, roleMiddleware("admin"), upload.single("image"), updateCategory);
router.get("/getCategory", getCategory);
router.delete("/deleteCategory/:id", authMiddleware, roleMiddleware("admin"), deleteCategory);

export default router;