# Cynergy Test Project

This project consists of a backend (Node.js/Express/OracleDB) and a frontend (React/Vite/TypeScript) for managing workers and departments.

## Prerequisites

- Node.js (v18+ recommended)
- npm
- Oracle Database (XE or compatible)
- Bash shell (for running setup scripts)

## Setup Instructions

### 1. Database Setup

Run the following scripts in the `/scripts` folder **in order**:

1. `db-setup.bash`  
   _Initializes the database and creates required tables._
2. `test-cynexe.sql`  
   _Populates the database with test data._
3. `custom-types.sql`  
   _Creates custom Oracle types used by the app._
4. `workers-pkg.sql`  
   _Creates the Oracle package for worker-related queries._

**How to run:**

- For `.bash` scripts: `bash db-setup.bash`
- For `.sql` scripts: Use your Oracle SQL client, e.g.:
  ```bash
  sqlplus <user>/<password>@<connection_string> @test-cynexe.sql
  sqlplus <user>/<password>@<connection_string> @custom-types.sql
  sqlplus <user>/<password>@<connection_string> @workers-pkg.sql
  ```

### 2. Install Dependencies

- **Frontend:**
  ```bash
  cd frontend
  npm install
  ```
- **Backend:**
  ```bash
  cd backend
  npm install
  ```

### 3. Environment Variables

Copy the provided `.env.example` files to `.env` in both `/backend` and `/frontend`, then update the values as needed:

- `/backend/.env.example`:
  - `PORT` (default: 8080)
  - `DB_USER`, `DB_PWD`, `DB_CONNECTION_STRING`
- `/frontend/.env.example`:
  - `VITE_API_BASE_URL` (default: http://localhost:8080/api)

### 4. Running the Project

```bash
npm run dev
```

**OR**

- **Backend (development):**
  ```bash
  cd backend
  npm run dev
  ```
- **Frontend (development):**
  ```bash
  cd frontend
  npm run dev
  ```

### 5. Running Tests

- **Backend:**
  ```bash
  cd backend
  npm test
  ```
- **Frontend:**
  ```bash
  cd frontend
  npm test
  ```

---

## Notes

- Make sure your Oracle database is running and accessible before starting the backend.
- The backend uses [oracledb](https://www.npmjs.com/package/oracledb) and [sequelize](https://sequelize.org/) for database access.
- The frontend uses [Vite](https://vitejs.dev/) and [React](https://react.dev/).
- For production, build both frontend and backend using their respective build scripts.

## License

MIT License © 2025 Carlos Sierra
