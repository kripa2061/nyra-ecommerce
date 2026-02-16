import express from "express";
import productController from "../controllers/productController.js";
import reviewController from "../controllers/reviewController.js";

const { addProduct, getProducts, getProductByID, removeProduct } = productController;
const {addReview,getReviews,deleteReview}=reviewController
const productRouter = express.Router();

productRouter.post("/addProduct", addProduct);
productRouter.get("/getProduct", getProducts); 
productRouter.delete("/removeProduct/:id", removeProduct);
productRouter.get("/getProductbyid/:id", getProductByID);
productRouter.post("/addReview",addReview);
productRouter.get("/getReview/:productId",getReviews)
productRouter.delete("/deleteReview/:productId/:reviewId",deleteReview)
export default productRouter;
