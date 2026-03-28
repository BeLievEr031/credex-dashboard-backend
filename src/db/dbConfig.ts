import mongoose from "mongoose";
import Config from "../config/config.ts";

const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(Config.MONGODB_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        if (error instanceof Error) {
            console.error(`Error: ${error.message}`);
        } else {
            console.error("An unknown error occurred while connecting to MongoDB");
        }
        process.exit(1);
    }
};

export default connectDB;
