import express from "express";
import ProductController from "../Controller/ProductController.js";

const { addProduct, getProducts, getProductByID, removeProduct } = ProductController;

const productRouter = express.Router();

productRouter.post("/addProduct", addProduct);
productRouter.get("/getProduct", getProducts); // notice getProducts, not getproducts
productRouter.delete("/removeProduct/:id", removeProduct);
productRouter.get("/getProductbyid/:id", getProductByID);

export default productRouter;
