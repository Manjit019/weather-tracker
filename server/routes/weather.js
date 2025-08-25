import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    // Current weather
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    // 5-day forecast
    const forecastResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast`,
      {
        params: {
          q: city,
          appid: process.env.OPENWEATHER_API_KEY,
          units: "metric",
        },
      }
    );

    res.json({
      current: weatherResponse.data,
      forecast: forecastResponse.data,
    });
  } catch (err) {
    console.error("⚠️ Weather API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
