import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => console.log("Database Connected"));
    mongoose.connection.on('error', (err) => console.error("MongoDB error:", err.message));

    await mongoose.connect(process.env.MONGODB_URI, {
        dbName: "ceylon-stay",
        serverSelectionTimeoutMS: 10000,
    });
};

export default connectDB;