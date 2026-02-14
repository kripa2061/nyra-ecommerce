import express from "express";
import productController from "../controllers/productController.js";

const { addProduct, getProducts, getProductByID, removeProduct } = productController;

const productRouter = express.Router();

productRouter.post("/addProduct", addProduct);
productRouter.get("/getProduct", getProducts); 
productRouter.delete("/removeProduct/:id", removeProduct);
productRouter.get("/getProductbyid/:id", getProductByID);

export default productRouter;
