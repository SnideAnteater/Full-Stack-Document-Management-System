import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler";
import documentRoutes from "./routes/documents";
import folderRoutes from "./routes/folders";
import pool from "./db/database";

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 8080;

// CORS configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  next();
});

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Document Management System API",
    version: "1.0.0",
    endpoints: {
      documents: "/api/documents",
      folders: "/api/folders",
    },
  });
});

app.use("/api/documents", documentRoutes);
app.use("/api/folders", folderRoutes);
app.use(notFoundHandler);
app.use(errorHandler);
async function startServer() {
  try {
    // Start server
    app.listen(PORT, () => {
      console.log(`\n🚀 Server is running on port ${PORT}`);
      console.log(`📡 API available at http://localhost:${PORT}`);
      console.log(
        `🔗 CORS enabled for: ${
          process.env.CORS_ORIGIN || "http://localhost:3000"
        }`
      );
      console.log(`\n📚 API Endpoints:`);
      console.log(`   GET    /api/documents - Get all documents`);
      console.log(`   GET    /api/documents/:id - Get document by ID`);
      console.log(`   POST   /api/documents - Create document`);
      console.log(`   DELETE /api/documents/:id - Delete document`);
      console.log(`   GET    /api/folders - Get all folders`);
      console.log(`   GET    /api/folders/:id - Get folder by ID`);
      console.log(`   POST   /api/folders - Create folder`);
      console.log(`   DELETE /api/folders/:id - Delete folder\n`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();
