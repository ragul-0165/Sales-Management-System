const salesService = require("../services/salesService");

async function getSales(req, res) {
  try {
    const result = await salesService.getSales(req.query);
    res.json(result);

  } catch (err) {
    console.error("Error in getSales:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  getSales
};
