const salesService = require("../services/salesService");

async function getSales(req, res) {
  try {
    // Extract filters from query
    const options = {
      page: req.query.page,
      search: req.query.search,
      regions: req.query.regions,
      genders: req.query.genders,
      categories: req.query.categories,
      tags: req.query.tags,
      paymentMethods: req.query.paymentMethods,
      ageMin: req.query.ageMin,
      ageMax: req.query.ageMax,
      dateFrom: req.query.dateFrom,
      dateTo: req.query.dateTo,
      sort: req.query.sort,
      order: req.query.order,
    };

    const result = await salesService.getSales(options);

    res.status(200).json(result);

  } catch (err) {
    console.error("❌ Error in getSales:", err);

    res.status(500).json({
      error: "Internal server error",
      message: err.message,
    });
  }
}

module.exports = {
  getSales,
};
