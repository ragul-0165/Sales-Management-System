# Sales Management System Backend

Express + SQLite API powering the retail sales dashboard. The server handles filtering, sorting, validation, and pagination to ensure the UI remains fast and responsive.

## Tech Stack
- Node.js with Express 5
- SQLite via `better-sqlite3`
- CSV import utility for the dataset

## Dataset

The dataset used in this project is large (223MB) and is therefore **not stored in this Git repository**.

### Download Instructions

1. Download the dataset from: [Google Drive](https://drive.google.com/file/d/1tyD7O8rqGuJEZyBAYeVx6Sc-PUdfhrzj/view?usp=sharing)

2. Create the following directory if it doesn't exist:
   ```
   backend/src/data/
   ```
3. Place the downloaded dataset file (e.g., `sales_data.csv`) in this directory

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
# 1. Install dependencies
cd backend
npm install

# 2. Create the database tables
node src/db/schema.js

# 3. Import the dataset (make sure to place the CSV file in backend/src/data/ first)
node src/db/importCSV.js

# 4. Start the development server
npm run dev   # with nodemon (auto-restarts on changes)
# or
npm start     # production mode
```

> **Note:** The first time you run the import script, it will create an SQLite database file (`sales.db`) in the `backend` directory. This file is included in `.gitignore` as it contains the imported data.

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
