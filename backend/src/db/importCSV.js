const fs = require("fs");
const csv = require("csv-parser");
const db = require("./connection");

const insert = db.prepare(`
  INSERT INTO sales (
    transaction_id, date, customer_id, customer_name, phone_number, gender, age,
    customer_region, customer_type, product_id, product_name, brand, product_category,
    tags, quantity, price_per_unit, discount_percentage, total_amount, final_amount,
    payment_method, order_status, delivery_type, store_id, store_location,
    salesperson_id, employee_name
  ) VALUES (
    @transaction_id, @date, @customer_id, @customer_name, @phone_number, @gender, @age,
    @customer_region, @customer_type, @product_id, @product_name, @brand, @product_category,
    @tags, @quantity, @price_per_unit, @discount_percentage, @total_amount, @final_amount,
    @payment_method, @order_status, @delivery_type, @store_id, @store_location,
    @salesperson_id, @employee_name
  )
`);

function normalizeRow(row) {
  return {
    transaction_id: row["Transaction ID"],
    date: row["Date"],
    customer_id: row["Customer ID"],
    customer_name: row["Customer Name"],
    phone_number: row["Phone Number"],
    gender: row["Gender"],
    age: Number(row["Age"]),
    customer_region: row["Customer Region"],
    customer_type: row["Customer Type"],
    product_id: row["Product ID"],
    product_name: row["Product Name"],
    brand: row["Brand"],
    product_category: row["Product Category"],
    tags: row["Tags"],
    quantity: Number(row["Quantity"]),
    price_per_unit: Number(row["Price per Unit"]),
    discount_percentage: Number(row["Discount Percentage"]),
    total_amount: Number(row["Total Amount"]),
    final_amount: Number(row["Final Amount"]),
    payment_method: row["Payment Method"],
    order_status: row["Order Status"],
    delivery_type: row["Delivery Type"],
    store_id: row["Store ID"],
    store_location: row["Store Location"],
    salesperson_id: row["Salesperson ID"],
    employee_name: row["Employee Name"]
  };
}

function importCSV(filePath) {
  db.exec("DELETE FROM sales");

  let count = 0;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      insert.run(normalizeRow(row));
      count++;
    })
    .on("end", () => {
      console.log(`Imported ${count} rows`);
    })
    .on("error", (err) => {
      console.error("CSV Import Error:", err);
    });
}

importCSV("./src/data/sales_data.csv");
