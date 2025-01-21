'use strict';
import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/cooksphere");
    console.log("Connected to MongoDB 🔌");
  } catch (e) {
    console.log(`MongoDB connection error: ${e}`)
  }
})();

export default mongoose;