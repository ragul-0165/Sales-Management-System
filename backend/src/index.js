const express = require("express");
const cors = require("cors");

const salesRoutes = require("./routes/salesRoutes");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "*"
}));
app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API Routes
app.use("/api/sales", salesRoutes);

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
