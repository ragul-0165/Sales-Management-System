require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const salesRoutes = require("./routes/salesRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: "*" }));
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error("MONGODB_URI not found");
  process.exit(1);
}

mongoose
  .connect(mongoURI, {
    maxPoolSize: 20,
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/sales", salesRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
