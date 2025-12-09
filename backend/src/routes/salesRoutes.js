const express = require("express");
const router = express.Router();
const salesController = require("../controllers/salesController");

// GET /api/sales
router.get("/", async (req, res, next) => {
  try {
    await salesController.getSales(req, res);
  } catch (err) {
    next(err);
  }
});

// Invalid route under /api/sales
router.all("*", (req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: `Invalid endpoint: ${req.originalUrl}`,
  });
});

module.exports = router;
