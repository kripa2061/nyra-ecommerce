import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./src/config/db.js";

import productRouter from "./src/routes/productRouter.js";
import fileUpload from 'express-fileupload';



import authRoutes from "./src/routes/authRoutes.js";


connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use(fileUpload());

app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.send("API is running ");
});
app.use("/api/product",productRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
