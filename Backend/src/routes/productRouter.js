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
productRouter.get("/getProduct", getProducts);
productRouter.get("/getProductbyid/:id",getProductByID);
productRouter.delete("/removeProduct/:id", removeProduct);

productRouter.get("/newArrival",getNewArrival);
productRouter.get("/offers",getOffers);

productRouter.post("/addReview",authMiddleware, addReview);
productRouter.get("/getReview/:productId",authMiddleware, getReviews);
productRouter.delete("/deleteReview/:productId/:reviewId",authMiddleware, deleteReview);
productRouter.get("/category/:category", getProductsByCategory);
export default productRouter;