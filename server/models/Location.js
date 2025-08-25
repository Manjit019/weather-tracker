// server/models/Location.js
import mongoose from "mongoose";

const LocationSchema = new mongoose.Schema(
  {
    city: { type: String, required: true },
    country: { type: String },
    query: { type: String } // stores the raw search text
  },
  { timestamps: true }
);

const Location = mongoose.model("Location", LocationSchema);

export default Location;   // ✅ make sure default export exists
