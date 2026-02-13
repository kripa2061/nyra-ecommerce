import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connectDB from "./Config/db.js";
import productRouter from "./Router/productRoute.js";
import fileUpload from 'express-fileupload';



connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(fileUpload());
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});
app.use("/api/product",productRouter)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
