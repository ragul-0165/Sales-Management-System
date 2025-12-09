const mongoose = require("mongoose");

const SaleSchema = new mongoose.Schema(
  {
    transaction_id: { type: Number, index: true },
    date: { type: Date, index: true },
    customer_id: String,
    customer_name: { type: String, index: true },
    phone_number: String,
    gender: String,
    age: Number,
    customer_region: { type: String, index: true },
    customer_type: String,
    product_id: String,
    product_name: String,
    brand: String,
    product_category: { type: String, index: true },
    tags: String,
    quantity: Number,
    price_per_unit: Number,
    discount_percentage: Number,
    total_amount: Number,
    final_amount: Number,
    payment_method: { type: String, index: true },
    order_status: String,
    delivery_type: String,
    store_id: String,
    store_location: String,
    salesperson_id: String,
    employee_name: String,
  },
  { collection: "sales" }
);

module.exports = mongoose.model("Sale", SaleSchema);
