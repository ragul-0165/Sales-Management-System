const mongoose = require("mongoose");
require("dotenv").config();

async function connectDB() {
  try {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error("MONGODB_URI not found in .env file");
    }

    await mongoose.connect(uri, {
      maxPoolSize: 20,         // allows concurrent queries
      serverSelectionTimeoutMS: 5000,
    });

    console.log("MongoDB connected successfully");

  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

module.exports = connectDB;
