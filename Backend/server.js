import './src/config/env.js'

import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import cookieParser from "cookie-parser";
import productRouter from "./src/routes/productRouter.js";
import authRoutes from './src/routes/authRoutes.js'
import orderRouter from "./src/routes/orderRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js"
import categoryRouter from "./src/routes/categoryRoutes.js";
import errorHandler from "./src/middleware/errorMiddleware.js";
import styleRouter from './src/routes/styleRoutes.js';


connectDB();

const app = express();



app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);
app.use("/api/cart",cartRoutes)
app.use("/api/style",styleRouter);
// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));