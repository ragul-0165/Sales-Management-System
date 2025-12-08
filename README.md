# Sales Management System Dashboard

A full-stack application for analyzing and visualizing retail sales data, built with React and Node.js.

## Features

- Interactive filtering and sorting of sales data
- Real-time data visualization with metric cards
- Responsive design for all screen sizes
- Server-side pagination and sorting
- Clean and intuitive user interface

## Technology Stack

**Frontend:**
- React 19 with Vite
- Vanilla CSS Modules for styling
- React Icons and Lucide Icons

**Backend:**
- Node.js with Express.js
- SQLite with Better-SQLite3
- RESTful API design

## Project Structure

```
truestate-retail-app/
├── backend/           # Node.js API server
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── db/          # Database configuration
│   │   ├── routes/      # API endpoints
│   │   ├── services/    # Business logic
│   │   └── utils/       # Helper functions
│   └── package.json
│
├── frontend/          # React application
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── hooks/      # Custom React hooks (with README)
│   │   ├── services/   # API services
│   │   ├── styles/     # CSS modules
│   │   ├── utils/      # Utility functions (with README)
│   │   ├── App.jsx     # Main component
│   │   └── main.jsx    # Entry point
│   └── package.json
│
└── docs/             # Project documentation
    └── architecture.md
```

## Getting Started

### Prerequisites
- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd truestate-retail-app
   ```

2. Set up the backend:
   ```bash
   cd backend
   npm install
   ```

3. Set up the frontend:
   ```bash
   cd ../frontend
   npm install
   ```

4. Start the development servers:
   ```bash
   # In backend directory
   npm run dev
   
   # In frontend directory (new terminal)
   npm run dev
   ```

5. Access the application at http://localhost:5173

## Configuration

### Backend
Create a `.env` file in the `backend` directory:
```
PORT=4000
NODE_ENV=development
```

### Frontend
Create a `.env` file in the `frontend` directory:
```
VITE_API_URL=http://localhost:4000/api
```

## Documentation

For detailed architecture and implementation details, see the [documentation](./docs/architecture.md).

## Available Scripts

### Backend
- `npm run dev` - Start development server
- `npm start` - Start production server
- `npm test` - Run tests

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build


