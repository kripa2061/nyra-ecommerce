import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import cookieParser from "cookie-parser";

// Routes
import productRouter from "./src/routes/productRouter.js";
import authRoutes from "./src/routes/authRoutes.js";
import orderRouter from "./src/routes/orderRoutes.js";
import cartRoutes from "./src/routes/cartRoutes.js";
import categoryRouter from "./src/routes/categoryRoutes.js";
import styleRouter from "./src/routes/styleRoutes.js";
import dashboardRouter from "./src/routes/dashBoard.js";

// Middleware
import errorHandler from "./src/middleware/errorMiddleware.js";

// Connect DB
connectDB();

const app = express();

// Allowed frontend origins
const allowedOrigins = [
  "https://womendressing.onrender.com",
  "https://womendressing-admin.onrender.com",
];

// CORS setup
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests like Postman (no origin)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
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
app.use("/api/cart", cartRoutes);
app.use("/api/style", styleRouter);
app.use("/api/admin", dashboardRouter);

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});