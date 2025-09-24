import express from "express";
import axios from "axios";
import Location from "../models/Location.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { city } = req.query;
    console.log(city);
    

    if (!city) {
      return res.status(400).json({ error: "City is required" });
    }

    await new Location({ city }).save();

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

router.post("/current-location", async (req, res) => {
  try {
    const { lat, lon } = req.body;

    if (!lat || !lon) {
      return res.status(400).json({ error: "Latitude and longitude are required" });
    }

    const weatherResponse = await axios.get(
     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );

    return res.json({
      current: weatherResponse.data,
    });
  }
  catch (err) {
    console.error("⚠️ Weather API error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
});

export default router;
