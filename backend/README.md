# Sales Management System Backend

Express + MongoDB API powering the retail sales dashboard. Handles filtering, sorting, validation, and pagination so the UI stays fast.

## Tech Stack
- Node.js with Express 4/5
- MongoDB with Mongoose
- CSV import (mongoimport) for the dataset

## Dataset (large: ~223MB)
- Not stored in the repo.
- Download: [Google Drive](https://drive.google.com/file/d/1dhlOQvsxCTJWpN4MRKRCopzRG_FxBMtp/view?usp=sharing)
- Create folder if missing: `backend/src/data/`
- Place `sales_data.csv` there.

### Importing the Dataset into MongoDB

Imported using **MongoDB Compass**:
1) Open MongoDB Compass  
2) Select your database (e.g., `retaildb`)  
3) Click **Collection → Add Data → Import CSV**  
4) Choose `sales_data.csv`  
5) Import into collection: **sales**

## Project Structure
```
backend/
  src/
    index.js              # App entry (env, CORS, JSON, Mongo connect, routes)
    routes/salesRoutes.js # API routes
    controllers/          # Request handlers
    services/             # Filters + pagination using Mongoose
    models/               # Mongoose models (Sale)
    utils/                # Helpers
    db/connection.js      # Mongo connection helper (optional)
    data/                 # CSV source (downloaded, not versioned)
  package.json            # scripts: dev, start
  nodemon.json
```

## Quick Start
Prereqs: Node 18+ and a MongoDB connection string.

```bash
# 1) Install
cd backend
npm install

# 2) Configure env
echo "PORT=4000
MONGODB_URI=<your-mongodb-uri>" > .env

# 3) Import data (after placing CSV in src/data/)
mongoimport --uri "<your MONGODB_URI>" --collection sales --type csv --headerline --file src/data/sales_data.csv

# 4) Run API
npm run dev   # nodemon
# or
npm start     # node
```

Server defaults to `PORT=4000` with open CORS for local development. Health check: `GET /health`.

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
- Filtering, sorting, and pagination are handled in `src/services/salesService.js`.
- CORS is open (`*`) for easy frontend integration during review.
- Page size is fixed at 10.
- You can inspect the imported data using MongoDB Compass (connect with your `MONGODB_URI`).
