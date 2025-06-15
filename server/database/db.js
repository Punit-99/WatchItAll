import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("DB Connected");
  } catch (error) {
    console.log("Error Connecting to DB", error);
    process.exit(1);
  }
};
