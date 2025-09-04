# WMS Frontend

Warehouse Management System (WMS) Frontend built with React, Bootstrap 5, Context API, and React Router. All data is stored in localStorage for persistence.

## Features
- Products, Salesmen, Assignments, Transactions, Dashboard, Settings, Authentication
- Pakistani mock data for products and salesmen
- Modern, professional theme
- User management (add/remove users)
- Toast notifications and confirm dialogs
- DataTable with search, sort, pagination
- Route protection (PrivateRoute)
- Reset buttons for demo data
- Auto-generated avatar initials for salesmen

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Folder Structure
- `src/pages/` — Feature pages (Products, Salesmen, etc.)
- `src/contexts/` — Context providers for global state
- `src/services/` — LocalStorage-backed data services
- `src/components/` — Reusable UI components
- `src/utils/` — Utility functions

## Customization
- Theme can be changed in `src/custom-theme.css`
- Pakistani data can be updated in `src/services/products.js` and `src/services/salesmen.js`

## Avatar
- Salesmen list displays auto-generated avatar initials based on their names.
- To enable image upload for avatars, further customization is needed.

## License
MIT
