import dns from "node:dns";
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";
import roomRouter from "./routes/roomRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";
import chartRouter from "./routes/chartRoutes.js";

// Fix "querySrv ECONNREFUSED": use public DNS for the mongodb+srv lookup
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express()
app.use(cors())  // Enable cross-origin Resource Sharing

// API to listen to stripe webhooks
app.post('/api/stripe', express.raw({type: 'application/json'}), stripeWebhooks);

// Middleware
app.use(express.json())
app.use(clerkMiddleware())

// API to listen to clerk webhooks
app.use("/api/clerk", clerkWebhooks);

app.get('/', (req, res)=> res.send("API is working "))
app.use('/api/user', userRouter)
app.use('/api/hotels', hotelRouter)
app.use('/api/rooms', roomRouter )
app.use('/api/bookings', bookingRouter )
app.use('/api/charts', chartRouter )

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await connectDB();
    await connectCloudinary();
    app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();