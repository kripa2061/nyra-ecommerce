import express from "express";
import multer from "multer";
import productController from "../controllers/productController.js";
import reviewController from "../controllers/reviewController.js";

const { addProduct, getProducts, getProductByID, removeProduct,getProductsByCategory, getNewArrival,getOffers } = productController;
const { addReview, getReviews, deleteReview } = reviewController;
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const productRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

productRouter.post("/addProduct",  upload.array("images"), addProduct);
productRouter.get("/getProduct",authMiddleware, getProducts);
productRouter.get("/getProductbyid/:id",authMiddleware, getProductByID);
productRouter.delete("/removeProduct/:id", removeProduct);

productRouter.get("/newArrival",authMiddleware,getNewArrival);
productRouter.get("/offers",authMiddleware,getOffers);

productRouter.post("/addReview",authMiddleware,roleMiddleware("user"), addReview);
productRouter.get("/getReview/:productId", getReviews);
productRouter.delete("/deleteReview/:productId/:reviewId",authMiddleware, deleteReview);
productRouter.get("/category/:category", getProductsByCategory);
export default productRouter;