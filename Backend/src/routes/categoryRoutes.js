import express from "express";
import multer from "multer";
import { addCategory, getCategory, deleteCategory, updateCategory } from "../controllers/categoryController.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Routes
router.post("/addCategory", upload.single("image"), addCategory);
router.put("/updateCategory/:id", upload.single("image"), updateCategory);
router.get("/getCategory", getCategory);
router.delete("/deleteCategory/:id", deleteCategory);

export default router;