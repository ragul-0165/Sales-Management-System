# Sales Management System Dashboard - Architecture

## System Overview

The Retail Sales Dashboard is a full-stack application consisting of a React frontend and a Node.js backend with SQLite database. The application provides a comprehensive interface for analyzing and visualizing retail sales data with filtering, sorting, and pagination capabilities.

### Architecture Diagram

```
[Browser]
    ↓
[React Frontend]
    ↓ REST API
[Node.js Backend]
    ↓
[SQLite DB]
```

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite with Better-SQLite3
- **Data Import**: CSV to SQLite conversion

### Directory Structure
```
backend/
├── src/
│   ├── controllers/    # Request handlers
│   │   └── salesController.js
│   ├── db/            # Database configuration and schema
│   │   ├── connection.js
│   │   ├── importCSV.js
│   │   └── schema.js
│   ├── routes/        # API routes
│   │   └── salesRoutes.js
│   ├── services/      # Business logic
│   │   └── salesService.js
│   ├── utils/         # Helper functions
│   │   └── helpers.js
│   └── index.js       # Application entry point
└── package.json
```

### Key Components
1. **API Layer**
   - RESTful endpoints for sales data
   - Request validation and error handling
   - CORS and security middleware

2. **Service Layer**
   - Business logic for data processing
   - Database operations
   - Data transformation

3. **Data Layer**
   - SQLite database for data persistence
   - Schema definition for sales data
   - CSV import functionality

## Frontend Architecture

### Technology Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **Icons**: Lucide Icons & React Icons

### Directory Structure
```
frontend/
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── FilterBar.jsx
│   │   ├── Layout.jsx
│   │   ├── MetricCards.jsx
│   │   └── SalesTable.jsx
│   ├── services/     # API service layer
│   │   └── api.js
│   ├── styles/       # Component styles
│   │   ├── app.css
│   │   ├── filterBar.css
│   │   ├── layout.css
│   │   ├── metricCards.css
│   │   └── salesTable.css
│   ├── App.jsx       # Main application component
│   └── main.jsx      # Application entry point
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
   - Backend loads data from CSV into SQLite on startup
   - Frontend fetches data via REST API

2. **User Interaction**
   - User applies filters/sorting
   - Frontend sends request to backend with query parameters
   - Backend processes request and returns filtered/sorted data
   - Frontend updates UI with new data

3. **State Management**
   - Component-level state for UI controls
   - API response data stored in component state
   - Props for parent-child component communication

## Security Considerations

- Input validation on both client and server
- CORS configuration for API access control
- SQL injection prevention using parameterized queries
- Error handling and logging

## Performance Optimizations

- Server-side pagination
- Efficient database queries with proper indexing
- Client-side caching of API responses
- Lazy loading of components (if implemented)
- Optimized asset loading with Vite

## Deployment

The application is designed to be easily deployable with minimal configuration:

1. **Backend**: Requires Node.js environment
2. **Frontend**: Static files served by any web server
3. **Database**: SQLite (file-based, no separate database server needed)

## Future Improvements

- Add user authentication
- Implement data export functionality
- Add more advanced visualizations
- Add unit and integration tests
- Implement proper logging and mon
itoring
