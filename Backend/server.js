import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./Config/db.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
