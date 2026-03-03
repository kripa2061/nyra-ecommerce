import express from "express";
import multer from "multer";
import productController from "../controllers/productController.js";
import reviewController from "../controllers/reviewController.js";

const { addProduct, getProducts, getProductByID, removeProduct } = productController;
const { addReview, getReviews, deleteReview } = reviewController;
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const productRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

productRouter.post("/addProduct", authMiddleware, roleMiddleware("admin"), upload.array("images"), addProduct);
productRouter.get("/getProduct", getProducts);
productRouter.get("/getProductbyid/:id", getProductByID);
productRouter.delete("/removeProduct/:id", authMiddleware, roleMiddleware("admin"), removeProduct);

productRouter.post("/addReview",authMiddleware,roleMiddleware("user"), addReview);
productRouter.get("/getReview/:productId", getReviews);
productRouter.delete("/deleteReview/:productId/:reviewId",authMiddleware, deleteReview);

export default productRouter;