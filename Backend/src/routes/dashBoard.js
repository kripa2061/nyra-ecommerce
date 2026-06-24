import express from "express";
import  {getDashboardData}  from "../controllers/dashboard.js";


const dashboardRouter = express.Router();
dashboardRouter.get("/getDashboard",getDashboardData)
export default dashboardRouter;