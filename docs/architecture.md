# Sales Management System Dashboard - Architecture

## System Overview

Full-stack application: React frontend + Node.js backend + MongoDB. Provides filtering, sorting, and pagination over retail sales data exposed via a REST API.

### Architecture Diagram

```
[Browser]
    ↓
[React Frontend]
    ↓ REST API (JSON)
[Node.js Backend (Express)]
    ↓
[MongoDB (sales collection)]
```

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Data Import**: CSV → MongoDB (via MongoDB Compass CSV Import)

### Directory Structure
```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   ├── db/             # Connection helper
│   ├── models/         # Mongoose schemas (Sale)
│   ├── routes/         # API routes
│   ├── services/       # Business logic (filters/pagination)
│   ├── utils/          # Helper functions
│   └── index.js        # Application entry point
└── package.json
```

### Key Components
1. **API Layer**
   - RESTful endpoints for sales data
   - Request validation and error handling
   - CORS for local dev

2. **Service Layer**
   - Builds MongoDB filters from query params
   - Sorting and server-side pagination

3. **Data Layer**
   - MongoDB for persistence
   - Mongoose models/indexed fields
   - CSV import via MongoDB Compass (CSV Import)

## Frontend Architecture

### Technology Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Plain CSS stylesheets (no Tailwind/UI framework)
- **Icons**: Lucide Icons & React Icons

### Directory Structure
```
frontend/
├── src/
│   ├── components/    # UI components
│   ├── services/      # API client
│   ├── styles/        # CSS modules
│   ├── hooks/         # Custom hooks (placeholder)
│   ├── utils/         # Utilities (placeholder)
│   ├── assets/        # Static assets (logo)
│   ├── App.jsx        # Main app
│   └── main.jsx       # Entry point
└── package.json
```

### Key Components
1. **Layout**
   - Responsive page structure
   - Navigation and header
   - Main content area

2. **FilterBar**
   - Interactive filter controls
   - Search functionality
   - Date range selection

3. **MetricCards**
   - Summary statistics display
   - Key performance indicators

4. **SalesTable**
   - Paginated data display
   - Sortable columns
   - Responsive design

## Data Flow

1. **Data Loading**
   - CSV imported into MongoDB (`sales` collection)
   - Frontend fetches via REST API

2. **User Interaction**
   - Filters/sort captured in UI
   - Frontend sends query params
   - Backend builds Mongo filters and paginated results
   - Frontend renders updated data

3. **State Management**
   - Component-level state for UI controls
   - API response data stored in component state
   - Props for parent-child component communication

## Security Considerations

- Input validation on both client and server
- CORS configuration for API access control
- Sanitized query building with Mongoose
- Error handling and logging

## Performance Optimizations

- Server-side pagination and indexed fields
- Efficient Mongo queries
- Client-side caching of API responses
- Optimized asset loading with Vite

## Deployment

1. Backend: Node.js with `MONGODB_URI` configured
2. Frontend: Static build from Vite
3. Database: MongoDB (Atlas or self-hosted)

## Future Improvements

- Add user authentication
- Implement data export functionality
- Add more advanced visualizations
- Add unit and integration tests
- Implement proper logging and monitoring
