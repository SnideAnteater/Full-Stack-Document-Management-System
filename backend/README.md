# Document Management System - Backend API

A RESTful API backend built with Express.js and TypeScript for managing documents and folders with MySQL database integration.

## 🚀 Features

- **Document Management**: Create, read, and delete documents
- **Folder Organization**: Create, read, and delete folders
- **Document Filtering**: Filter documents by folder or search query
- **Type Safety**: Built with TypeScript for robust type checking
- **Input Validation**: Express-validator for request validation
- **CORS Support**: Configured for cross-origin requests
- **Error Handling**: Centralized error handling middleware

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **MySQL** (v5.7 or higher)
- **npm** or **yarn**

## 🛠️ Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MySQL with mysql2
- **Validation**: express-validator
- **Development**: ts-node-dev for hot reload
- **ID Generation**: nanoid

## 📦 Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up MySQL Database

#### Install MySQL (if not already installed)

**macOS:**

```bash
brew install mysql
brew services start mysql
```

#### Import Schema

```bash
mysql -u root -p dms_app < database/schema.sql
```

### 3. Configure Environment Variables

Copy the example environment file and update it:

```bash
cp .env.example .env
```

Update `.env` with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=dms_app
PORT=8080
CORS_ORIGIN=http://localhost:3000
```

## 🚦 Running the Server

### Development Mode

```bash
npm run dev
```

The server will start on `http://localhost:8080` with hot reload enabled.

### Production Mode

```bash
npm start
```

## 📚 API Endpoints

### Documents

| Method | Endpoint                        | Description           |
| ------ | ------------------------------- | --------------------- |
| GET    | `/api/documents`                | Get all documents     |
| GET    | `/api/documents?search={query}` | Search documents      |
| GET    | `/api/documents/:id`            | Get document by ID    |
| POST   | `/api/documents`                | Create a new document |
| DELETE | `/api/documents/:id`            | Delete a document     |

### Folders

| Method | Endpoint                     | Description             |
| ------ | ---------------------------- | ----------------------- |
| GET    | `/api/folders`               | Get all folders         |
| GET    | `/api/folders?folderId={id}` | Get documents by folder |
| POST   | `/api/folders`               | Create a new folder     |
| DELETE | `/api/folders/:id`           | Delete a folder         |

## 🗂️ Project Structure

```
backend/
├── database/
│   └── schema.sql           # MySQL database schema
├── src/
│   ├── app.ts              # Express application setup
│   ├── db/
│   │   ├── database.ts     # MySQL connection pool
│   │   └── queries.ts      # Database queries
│   ├── middleware/
│   │   └── errorHandler.ts # Error handling middleware
│   ├── routes/
│   │   ├── documents.ts    # Document routes
│   │   └── folders.ts      # Folder routes
│   └── types/
│       └── index.ts        # TypeScript type definitions
├── .env                    # Environment variables (not in git)
├── .env.example            # Example environment variables
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── SETUP.md               # Detailed setup instructions
```

## 🔧 Environment Variables

| Variable      | Description         | Default               |
| ------------- | ------------------- | --------------------- |
| `DB_HOST`     | MySQL host          | localhost             |
| `DB_USER`     | MySQL username      | root                  |
| `DB_PASSWORD` | MySQL password      | -                     |
| `DB_NAME`     | Database name       | dms_app               |
| `PORT`        | Server port         | 8080                  |
| `CORS_ORIGIN` | Allowed CORS origin | http://localhost:3000 |

## 🔥 Available Scripts

```bash
# Start development server with hot reload
npm run dev
```
