import express from "express";
import multer from "multer";
import productController from "../controllers/productController.js";
import reviewController from "../controllers/reviewController.js";

const { addProduct, getProducts, getProductByID, removeProduct } = productController;
const { addReview, getReviews, deleteReview } = reviewController;

const productRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

productRouter.post("/addProduct", upload.array("images"), addProduct);
productRouter.get("/getProduct", getProducts);
productRouter.get("/getProductbyid/:id", getProductByID);
productRouter.delete("/removeProduct/:id", removeProduct);

productRouter.post("/addReview", addReview);
productRouter.get("/getReview/:productId", getReviews);
productRouter.delete("/deleteReview/:productId/:reviewId", deleteReview);

export default productRouter;