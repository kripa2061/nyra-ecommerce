import express from "express";


import authMiddleware from "../middleware/authMiddleware.js";
import { addStyle, getStyle, getStyleById, removeStyle } from "../controllers/styleController.js";
import multer from "multer";

const styleRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

styleRouter.post("/addStyle",  upload.array("images"),addStyle );
styleRouter.get("/getStyle",  getStyle);
styleRouter.get("/getstyleById/:id",  getStyleById);

styleRouter.delete("/deleteStyle", removeStyle); 

export default styleRouter;
