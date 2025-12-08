const db = require("../db/connection");


function splitCSV(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}


function buildWhereClause(options) {
  const whereParts = [];
  const params = [];

  const {
    search,
    regions,
    genders,
    categories,
    tags,
    paymentMethods,
    ageMin,
    ageMax,
    dateFrom,
    dateTo,
  } = options;

  // Customer Name + Phone Number
  if (search) {
    const term = `%${search.toLowerCase()}%`;
    whereParts.push(
      "(LOWER(customer_name) LIKE ? OR phone_number LIKE ?)"
    );
    params.push(term, term);
  }

  // Customer Region
  const regionList = splitCSV(regions);
  if (regionList.length > 0) {
    const placeholders = regionList.map(() => "?").join(",");
    whereParts.push(`customer_region IN (${placeholders})`);
    params.push(...regionList);
  }

  // Gender 
  const genderList = splitCSV(genders);
  if (genderList.length > 0) {
    const placeholders = genderList.map(() => "?").join(",");
    whereParts.push(`gender IN (${placeholders})`);
    params.push(...genderList);
  }

  // Product Category
  const categoryList = splitCSV(categories);
  if (categoryList.length > 0) {
    const placeholders = categoryList.map(() => "?").join(",");
    whereParts.push(`product_category IN (${placeholders})`);
    params.push(...categoryList);
  }

  // Tags
  const tagsList = splitCSV(tags);
  if (tagsList.length > 0) {
    const tagConds = tagsList.map(() => "LOWER(tags) LIKE ?");
    whereParts.push(`(${tagConds.join(" OR ")})`);
    tagsList.forEach((t) => params.push(`%${t.toLowerCase()}%`));
  }

  // Payment Method
  const paymentList = splitCSV(paymentMethods);
  if (paymentList.length > 0) {
    const placeholders = paymentList.map(() => "?").join(",");
    whereParts.push(`payment_method IN (${placeholders})`);
    params.push(...paymentList);
  }

  // Age Range 
let min = null;
let max = null;

if (options.ageMin !== undefined && options.ageMin !== null && options.ageMin !== "") {
  const n = Number(options.ageMin);
  if (!Number.isNaN(n)) min = n;
}

if (options.ageMax !== undefined && options.ageMax !== null && options.ageMax !== "") {
  const n = Number(options.ageMax);
  if (!Number.isNaN(n)) max = n;
}


if (!(min === null && max === null)) {
  
  if (min !== null) min = Math.max(min, 0);    
  if (max !== null) max = Math.min(max, 120);  

  // swap if reversed
  if (min !== null && max !== null && min > max) {
    const tmp = min;
    min = max;
    max = tmp;
  }

  // Compose SQL
  if (min !== null) {
    whereParts.push("age >= ?");
    params.push(min);
  }

  if (max !== null) {
    whereParts.push("age <= ?");
    params.push(max);
  }
}


  // Date Range
  if (dateFrom) {
    whereParts.push("date >= ?");
    params.push(dateFrom);
  }
  if (dateTo) {
    whereParts.push("date <= ?");
    params.push(dateTo);
  }

  const whereClause =
    whereParts.length > 0 ? "WHERE " + whereParts.join(" AND ") : "";

  return { whereClause, params };
}

// sorting
function normalizeSort(options) {
  const { sort, order } = options;

  const allowedSorts = {
    date: "date",
    quantity: "quantity",
    customer_name: "customer_name",
  };

  let sortColumn = allowedSorts[sort] || "customer_name";
  let sortDirection = order && ["asc","desc"].includes(order.toLowerCase())
    ? order.toUpperCase()
    : "ASC";

  return { sortColumn, sortDirection };
}

async function getSales(options) {
  const pageSize = 10;
  const page = options.page ? Number(options.page) : 1;
  const safePage = page > 0 ? page : 1;
  const offset = (safePage - 1) * pageSize;

  

  // copy for modification
  const opts = { ...options };

  // Convert empty strings to null
  if (opts.ageMin === "" || opts.ageMin === undefined || opts.ageMin === null) {
    opts.ageMin = null;
  }
  if (opts.ageMax === "" || opts.ageMax === undefined || opts.ageMax === null) {
    opts.ageMax = null;
  }

  // Convert numeric strings to numbers
  if (opts.ageMin !== null) {
    const n = Number(opts.ageMin);
    opts.ageMin = Number.isNaN(n) ? null : n;
  }
  if (opts.ageMax !== null) {
    const n = Number(opts.ageMax);
    opts.ageMax = Number.isNaN(n) ? null : n;
  }

  // Swap if reversed
  if (opts.ageMin !== null && opts.ageMax !== null && opts.ageMin > opts.ageMax) {
    const tmp = opts.ageMin;
    opts.ageMin = opts.ageMax;
    opts.ageMax = tmp;
  }

  
  if (opts.ageMin !== null) opts.ageMin = Math.max(opts.ageMin, 0);
  if (opts.ageMax !== null) opts.ageMax = Math.min(opts.ageMax, 120);

  
  const { whereClause, params } = buildWhereClause(opts);

  
  // Sorting
  const { sortColumn, sortDirection } = normalizeSort(opts);

  // Total count
  const countStmt = db.prepare(
    `SELECT COUNT(*) AS total FROM sales ${whereClause}`
  );
  const { total } = countStmt.get(...params);
  const totalCount = total || 0;
  const totalPages =
    totalCount === 0 ? 1 : Math.ceil(totalCount / pageSize);

  // Data query 

  const dataStmt = db.prepare(
    `
    SELECT
      transaction_id,
      date,
      customer_id,
      customer_name,
      phone_number,
      gender,
      age,
      customer_region,
      customer_type,
      product_id,
      product_name,
      brand,
      product_category,
      tags,
      quantity,
      price_per_unit,
      discount_percentage,
      total_amount,
      final_amount,
      payment_method,
      order_status,
      delivery_type,
      store_id,
      store_location,
      salesperson_id,
      employee_name
    FROM sales
    ${whereClause}
    ORDER BY ${sortColumn} ${sortDirection}
    LIMIT ? OFFSET ?
  `
  );

  const rows = dataStmt.all(...params, pageSize, offset);

  return {
    data: rows,
    page: Number(safePage),
    pageSize: Number(pageSize),
    totalCount,
    totalPages,
  };
}


module.exports = {
  getSales,
};
