# Full-Stack Document Management System

A document management system with Next.js frontend and Express backend.

## 🛠️ Tech Stack

**Frontend:** Next.js 16, TypeScript, Tailwind CSS  
**Backend:** Express.js, TypeScript, MySQL  
**Port:** Frontend (3000), Backend (8080)

## 🚀 Quick Start

### Prerequisites

- Node.js (v16+)
- MySQL (v5.7+)

### Setup Backend

```bash
cd backend
npm install

# Create database
mysql -u root -p
CREATE DATABASE dms_app;
exit;

# Import schema
mysql -u root -p dms_app < database/schema.sql

# Configure environment
cp .env.example .env
# Edit .env with your MySQL credentials

# Start server
npm run dev
```

Backend runs on **http://localhost:8080**

### Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:3000**

## ✨ Features

- 📁 Create and manage folders
- 📄 Upload and organize documents
- 🔍 Real-time search
- 🗑️ Delete documents and folders
- 🌙 Dark mode support
- 📱 Responsive design

## 📚 Documentation

- [Backend README](backend/README.md) - API documentation
- [Frontend README](frontend/README.md) - Frontend setup
- [Backend Setup Guide](backend/SETUP.md) - MySQL configuration

## 🔧 Development

```bash
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```
