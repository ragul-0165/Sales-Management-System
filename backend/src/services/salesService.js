const Sale = require("../models/Sale");

function splitCSV(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map(v => v.trim())
    .filter(Boolean);
}

function buildFilters(opts) {
  const filter = {};

  if (opts.search) {
    const text = opts.search.trim();
    filter.$or = [
      { "Customer Name": { $regex: text, $options: "i" } },
      { "Phone Number": { $regex: text, $options: "i" } },
    ];
  }

  const regionList = splitCSV(opts.regions);
  if (regionList.length > 0) {
    filter["Customer Region"] = { $in: regionList };
  }

  const genderList = splitCSV(opts.genders);
  if (genderList.length > 0) {
    filter["Gender"] = { $in: genderList };
  }

  const categoryList = splitCSV(opts.categories);
  if (categoryList.length > 0) {
    filter["Product Category"] = { $in: categoryList };
  }

  const tagsList = splitCSV(opts.tags);
  if (tagsList.length > 0) {
    filter["Tags"] = { $regex: tagsList.join("|"), $options: "i" };
  }

  const paymentList = splitCSV(opts.paymentMethods);
  if (paymentList.length > 0) {
    filter["Payment Method"] = { $in: paymentList };
  }

  const ageQuery = {};
  if (opts.ageMin && !isNaN(Number(opts.ageMin))) {
    ageQuery.$gte = Number(opts.ageMin);
  }
  if (opts.ageMax && !isNaN(Number(opts.ageMax))) {
    ageQuery.$lte = Number(opts.ageMax);
  }
  if (Object.keys(ageQuery).length > 0) {
    filter["Age"] = ageQuery;
  }

  const dateQuery = {};
  if (opts.dateFrom) {
    dateQuery.$gte = new Date(opts.dateFrom);
  }
  if (opts.dateTo) {
    dateQuery.$lte = new Date(opts.dateTo);
  }
  if (Object.keys(dateQuery).length > 0) {
    filter["Date"] = dateQuery;
  }

  return filter;
}

function normalizeSort(opts) {
  const allowed = {
    date: "Date",
    quantity: "Quantity",
    customer_name: "Customer Name",
  };

  const field = allowed[opts.sort] || "Customer Name";

  const direction = opts.order && ["asc", "desc"].includes(opts.order.toLowerCase())
    ? opts.order.toLowerCase()
    : "asc";

  return { field, direction };
}

function mapDoc(doc) {
  return {
    id: doc._id,
    transaction_id: doc["Transaction ID"],
    date: doc["Date"],
    customer_id: doc["Customer ID"],
    customer_name: doc["Customer Name"],
    phone_number: doc["Phone Number"],
    gender: doc["Gender"],
    age: doc["Age"],
    customer_region: doc["Customer Region"],
    customer_type: doc["Customer Type"],
    product_id: doc["Product ID"],
    product_name: doc["Product Name"],
    brand: doc["Brand"],
    product_category: doc["Product Category"],
    tags: doc["Tags"],
    quantity: doc["Quantity"],
    price_per_unit: doc["Price per Unit"],
    discount_percentage: doc["Discount Percentage"],
    total_amount: doc["Total Amount"],
    final_amount: doc["Final Amount"],
    payment_method: doc["Payment Method"],
    order_status: doc["Order Status"],
    delivery_type: doc["Delivery Type"],
    store_id: doc["Store ID"],
    store_location: doc["Store Location"],
    salesperson_id: doc["Salesperson ID"],
    employee_name: doc["Employee Name"],
  };
}

async function getSales(options) {
  const pageSize = 10;
  const page = Math.max(Number(options.page) || 1, 1);
  const skip = (page - 1) * pageSize;

  const filter = buildFilters(options);
  const { field, direction } = normalizeSort(options);

  const totalCount = await Sale.countDocuments(filter);
  const totalPages = totalCount > 0
    ? Math.ceil(totalCount / pageSize)
    : 1;

  const docs = await Sale
    .find(filter)
    .sort({ [field]: direction === "asc" ? 1 : -1 })
    .skip(skip)
    .limit(pageSize)
    .select("-__v")
    .lean();

  const data = docs.map(mapDoc);

  return {
    data,
    page,
    pageSize,
    totalCount,
    totalPages,
  };
}

module.exports = {
  getSales,
};
