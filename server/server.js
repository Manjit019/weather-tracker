import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import weatherRoutes from "./routes/weather.js";  // ✅ Default import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Hello from Weather Tracker!"));

// Routes
app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    dbName: "weather-tracker",
  })
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
