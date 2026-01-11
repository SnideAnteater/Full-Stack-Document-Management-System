# Backend Setup Guide

## Prerequisites

Before running the backend, you need:

1. **Node.js** (v16 or higher)
2. **MySQL** (v5.7 or higher)
3. **npm** or **yarn**

## Step-by-Step Setup

### 1. Install MySQL (if not already installed)

**macOS (using Homebrew):**

```bash
brew install mysql
brew services start mysql
```

**Ubuntu/Debian:**

```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

**Windows:**
Download and install from [MySQL Downloads](https://dev.mysql.com/downloads/installer/)

### 2. Secure MySQL Installation (Optional but Recommended)

```bash
mysql_secure_installation
```

Follow the prompts to set a root password and secure your installation.

### 3. Create Database

Login to MySQL:

```bash
mysql -u root -p
```

Create the database:

```sql
CREATE DATABASE dms_app;
exit;
```

### 4. Import Database Schema

From the backend directory:

```bash
mysql -u root -p dms_app < database/schema.sql
```

Or manually in MySQL:

```bash
mysql -u root -p
USE dms_app;
source /path/to/backend/database/schema.sql;
exit;
```

### 5. Configure Environment Variables

The `.env` file is already created. Update it if needed:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=dms_app
PORT=8080
CORS_ORIGIN=http://localhost:3000
```

**Important:** Replace `your_mysql_password_here` with your actual MySQL root password!

### 6. Install Dependencies

```bash
npm install
```

### 7. Start the Server

```bash
npm run dev
```

You should see:

```
✅ Database connected successfully
🚀 Server is running on port 8080
📡 API available at http://localhost:8080
```

## Verify Installation

### Test the API

Open your browser or use curl:

```bash
# Health check
curl http://localhost:8080

# Get all documents
curl http://localhost:8080/api/documents

# Get all folders
curl http://localhost:8080/api/folders
```

You should receive JSON responses with the sample data.

## Troubleshooting

### Database Connection Failed

**Error:** `Access denied for user 'root'@'localhost'`

**Solution:**

1. Check your password in `.env` file
2. Verify MySQL is running: `mysql -u root -p`
3. Make sure the database exists: `SHOW DATABASES;`

### Port Already in Use

**Error:** `EADDRINUSE: address already in use :::8080`

**Solution:**

1. Change `PORT=8080` to another port in `.env`
2. Or kill the process using port 8080:

   ```bash
   # macOS/Linux
   lsof -ti:8080 | xargs kill -9

   # Windows
   netstat -ano | findstr :8080
   taskkill /PID <PID> /F
   ```

### Cannot Find Module

**Error:** `Cannot find module 'express'`

**Solution:**

```bash
rm -rf node_modules package-lock.json
npm install
```

## Quick MySQL Commands

```bash
# Login to MySQL
mysql -u root -p

# Show all databases
SHOW DATABASES;

# Use the DMS database
USE dms_app;

# Show all tables
SHOW TABLES;

# View documents
SELECT * FROM documents;

# View folders
SELECT * FROM folders;

# Exit MySQL
exit;
```

## Next Steps

Once the backend is running:

1. Keep the backend server running (port 8080)
2. Start the frontend in another terminal (port 3000)
3. The frontend will automatically connect to the backend API
4. Test creating documents and folders through the UI

## Production Deployment

For production deployment, consider:

1. Using a managed MySQL service (AWS RDS, Digital Ocean, etc.)
2. Setting strong passwords
3. Enabling SSL for database connections
4. Using PM2 or similar for process management
5. Setting up reverse proxy with Nginx
6. Implementing rate limiting
7. Adding authentication/authorization
