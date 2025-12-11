import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    console.error("❌ MONGO_URI is not defined in .env file.");
    return;
  }
  
  try {
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
    console.log("✅ MongoDB Connected successfully.");
  } catch (err) {
    console.error("❌ MongoDB Connection FAILED:", (err as Error).message);
  }
};

export default connectDB;