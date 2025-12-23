import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./db.ts"; 
import aiRoutes from "./routes/aiRoutes.ts";
import authRoutes from "./routes/auth.ts"; 
import otpRoutes from "./routes/otp.ts";   

const app = express();

dotenv.config({ path: path.join(process.cwd(), "..", ".env") }); 

app.use(express.json());


connectDB();


app.use("/api/auth", authRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/ai", aiRoutes);


const frontendPath = path.join(process.cwd(), "../../frontend/build");
app.use(express.static(frontendPath));


app.get(/.*/, (req: Request, res: Response) => {
  res.sendFile(path.join(frontendPath, "index.html"), (err) => {
    if (err) {
      console.error("Error sending index.html:", err);
      res.status(500).send("Build folder not found. Ensure you ran 'npm run build' in the frontend folder.");
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("🚀 Unified Server running on http://localhost:${PORT}");
    console.log("📂 Serving frontend from: ${frontendPath}");
});

export default app;