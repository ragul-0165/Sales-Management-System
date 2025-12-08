# Sales Management System Backend

Express + SQLite API powering the TruEstate retail dashboard. The server owns filtering, sorting, validation, and pagination so the UI stays quick and predictable. This README is written for interview review—clear, concise, and plagiarism-free.

## Tech Stack
- Node.js with Express 5
- SQLite via `better-sqlite3`
- CSV import utility for the provided dataset

## Project Structure
```
backend/
  src/
    index.js            # App entrypoint (CORS, JSON, routes, health)
    routes/salesRoutes.js
    controllers/salesController.js
    services/salesService.js   # Filtering, sorting, pagination
    db/
      connection.js     # SQLite connection
      schema.js         # Table definition
      importCSV.js      # Seeds DB from data/sales_data.csv
      sales.db          # Generated DB
    data/sales_data.csv # Provided dataset
  package.json
  nodemon.json
```

## Quick Start
Prereqs: Node 18+ recommended.

```bash
cd backend
npm install

# 1) Create table (idempotent)
node src/db/schema.js

# 2) Import the CSV into SQLite (rerun to refresh data)
node src/db/importCSV.js

# 3) Run the API
npm run dev   # with nodemon
# or
npm start     # plain node
```

Server starts on `PORT` (default `4000`) and enables open CORS for local development.

## API
### Health
- `GET /health` → `{ "status": "ok" }`

### Sales
Returns a page of filtered and sorted sales records with metadata.

- `GET /api/sales`
- Query params (all optional):
  - `search`: customer name or phone number match
  - `regions`, `genders`, `categories`, `tags`, `paymentMethods`: comma-separated values
  - `ageMin`, `ageMax`: numeric range (validated and clamped)
  - `dateFrom`, `dateTo`: `YYYY-MM-DD`
  - `sort`: `date | quantity | customer_name` (default `customer_name`)
  - `order`: `asc | desc` (default `asc`)
  - `page`: page number (page size fixed at 10)
- Response shape:
  - `data`: array of sales rows
  - `page`, `pageSize`: numbers
  - `totalCount`, `totalPages`: numbers

## Notes
- Database file lives at `src/db/sales.db`; delete or re-import to reset data.
- Filtering, sorting, and pagination are handled in `src/services/salesService.js`.
- CORS is open (`*`) for easy frontend integration during review.
