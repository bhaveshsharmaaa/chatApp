import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import tokenWalaRoutes from "./routes/chat.routes.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, server } from "./lib/socket.js";
import path from "path";
import bodyParser from "body-parser";
import multer from "multer"; // Only if you're handling file uploads

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

console.log("cccccc", __dirname);

// Create the multer instance if you're handling file uploads
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for file uploads
});

// Increase payload limits
app.use(express.json({ limit: "10mb" })); // For JSON payloads
app.use(express.urlencoded({ limit: "10mb", extended: true })); // For URL-encoded data
app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: "https://chatapp-xan2.onrender.com",
    credentials: true,
  })
);

// Your Routes
console.log("Registering /api/auth");
app.use("/api/auth", authRoutes);

console.log("Registering /api/message");
app.use("/api/messages", messageRoutes);

console.log("chat routes registered");
app.use("/api/chat", tokenWalaRoutes);

// Static file serving in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

// Global error handler for payload too large
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError || err.type === "entity.too.large") {
    return res.status(413).json({ message: "Payload too large" });
  }
  next(err);
});

// Server
server.listen(PORT, () => {
  console.log("Server is running on " + PORT);
  connectDB();
});
