const Database = require("better-sqlite3");
const db = new Database("./src/db/sales.db");

module.exports = db;
