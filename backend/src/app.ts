import express from "express";
import cors from "cors"; 
import dotenv from "dotenv";

// Import all routes
import connectDB from "./db.ts"; 
import authRoutes from "./routes/auth.ts"; 
import otpRoutes from "./routes/otp.ts";   
import aiRoutes from "./routes/aiRoutes.ts";

// 💥 CRITICAL FIX: Tell dotenv to look in the parent folder (../)
dotenv.config({ path: '../.env' }); 

// CRITICAL KEY CHECK 
if (!process.env.GEMINI_API_KEY) { 
    console.error("❌ FATAL ERROR: GEMINI_API_KEY is NOT loaded from .env");
} else {
    console.log("✅ Gemini Key Successfully Loaded.");
}

const app = express();
// ... (rest of the file is unchanged) ...