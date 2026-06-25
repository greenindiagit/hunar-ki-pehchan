import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import compression from "compression";
import path from "path";
import { fileURLToPath } from "url";
import connectDatabase from "./src/database/connectDatabase.js";
import errorHandler from "./src/middlewares/errorHandler.middleware.js";
import Routes from "./src/routes/routes.js";

// Get the current file
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current file
const __dirname = path.dirname(__filename);

// Load Environment variables
dotenv.config();
const port = process.env.PORT || 8088;
const mode = process.env.NODE_ENV || "development";

// Connect to MongoDB Database
connectDatabase();

// Init Express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(cors());

// API Routes
app.use("/api/v1", Routes);

// Serve uploads file
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
// Serve dist file of client
app.use("/", express.static(path.join(__dirname, "../client", "dist")));

// Serve dist file of admin
app.use("/admin", express.static(path.join(__dirname, "../admin", "dist")));

// Admin routes
app.get(/admin/, (req, res) =>
  res.sendFile(path.join(__dirname, "../admin", "dist", "index.html"))
);

// Client routes
app.get(/.*/, (req, res) =>
  res.sendFile(path.join(__dirname, "../client", "dist", "index.html"))
);

// Global error handling middleware
app.use(errorHandler);

// Start the server
app.listen(port, () =>
  console.log(
    `✅ Server is running in ${mode} mode at http://localhost:${port}`
  )
);
