import Booking from "../models/Booking.js";
import Hotel from "../models/Hotel.js";


export const revenueChart = async (req, res) => {
  try {
    const { period } = req.query;
    const owner = req.user._id;

    const hotel = await Hotel.findOne({owner: owner})
    if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });
    

    if (period === "yearly") {

        const yearlyData = await Booking.aggregate([
            {
            $match: {
                hotel: hotel._id.toString(),
                status: { $ne: "cancelled" },
            },
            },
            {
            $group: {
                _id: { $year: "$checkInDate" },
                online: {
                $sum: {
                    $cond: [{ $eq: ["$isPaid", true] }, "$totalPrice", 0],
                },
                },
                cash: {
                $sum: {
                    $cond: [{ $eq: ["$isPaid", false] }, "$totalPrice", 0],
                },
                },
                totalRevenue: { $sum: "$totalPrice" },
            },
            },
            {
            $sort: { "_id": 1 },
            },
        ]);
        res.json({success: true, chartData: yearlyData})
      
    } else if (period === "monthly") {
        const monthlyData = await Booking.aggregate([
            {
            $match: {
                hotel: hotel._id.toString(),
                status: { $ne: "cancelled" },
            },
            },
            {
            $group: {
                _id: { $month: "$checkInDate" },
                online: {
                $sum: {
                    $cond: [{ $eq: ["$isPaid", true] }, "$totalPrice", 0],
                },
                },
                cash: {
                $sum: {
                    $cond: [{ $eq: ["$isPaid", false] }, "$totalPrice", 0],
                },
                },
                totalRevenue: { $sum: "$totalPrice" },
            },
            },
            {
            $sort: { "_id": 1 },
            },
        ]);
        res.json({success: true, chartData: monthlyData})
    } else if (period === "weekly") {
      const weeklyData = await Booking.aggregate([
            {
            $match: {
                hotel: hotel._id.toString(),
                status: { $ne: "cancelled" },
            },
            },
            {
            $group: {
                _id: { 
                      year: { $year: "$checkInDate" },
                      week: { $isoWeek: "$checkInDate" },
                      },
                online: {
                $sum: {
                    $cond: [{ $eq: ["$isPaid", true] }, "$totalPrice", 0],
                },
                },
                cash: {
                $sum: {
                    $cond: [{ $eq: ["$isPaid", false] }, "$totalPrice", 0],
                },
                },
                totalRevenue: { $sum: "$totalPrice" },
            },
            },
            {
            $sort: { "_id": 1 },
            },
        ]);
        res.json({success: true, chartData: weeklyData})

    } else {
      return res.status(400).json({
        message: "Invalid period. Use yearly, monthly, or weekly.",
      });
    }

            
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


export const bookingChart = async (req, res) => {
  try {

    const owner = req.user._id;

    const hotel = await Hotel.findOne({owner: owner})
    if (!hotel) return res.status(404).json({ success: false, message: "Hotel not found" });

    const pieData = await Booking.aggregate([
            {
            $match: {
                hotel: hotel._id.toString(),
                status: { $ne: "cancelled" },
            },
            },
            {
            $group: {
                _id: { $year: "$checkInDate" },
                online: {
                $sum: {
                    $cond: [{ $eq: ["$isPaid", true] },1, 0],
                },
                },
                cash: {
                $sum: {
                    $cond: [{ $eq: ["$isPaid", false] }, 1, 0],
                },
                },
                totalBookings: { $sum: 1 },
            },
            },
            {
            $sort: { "_id": 1 },
            },
        ]);
        res.json({success: true, pieData})
        
  } catch (error) {
      console.log(error.message);
      res.json({ success: false, message: error.message });
  }
}