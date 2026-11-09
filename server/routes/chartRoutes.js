import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerHotel } from "../controllers/hotelController.js";
import { bookingChart, revenueChart } from "../controllers/chartController.js";


const chartRouter = express.Router();

chartRouter.get('/revenue', protect, revenueChart);
chartRouter.get('/totBookings', protect, bookingChart);

export default chartRouter;