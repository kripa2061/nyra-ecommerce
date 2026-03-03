import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./src/config/db.js";
import productRouter from "./src/routes/productRouter.js";
import cartRouter from "./src/routes/cartRoutes.js";
import fileUpload from 'express-fileupload';
import authRoutes from "./src/routes/authRoutes.js";
import orderRouter from "./src/routes/orderRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";

connectDB();
const app = express();

// CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    createParentPath: true
}));
app.use("/api/auth", authRoutes);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("./api/cart", cartRouter);


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/category", categoryRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));