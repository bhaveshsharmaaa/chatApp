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

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

// Important: increase payload limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Important: manually allow credentials
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cookieParser());

// Your Routes
console.log("Registering /api/auth");
app.use("/api/auth", authRoutes);

console.log("Registering /api/message");
app.use("/api/messages", messageRoutes);

console.log("chat routes registered");
app.use("/api/chat", tokenWalaRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

// Server
server.listen(PORT, () => {
  console.log("Server is running on " + PORT);
  connectDB();
});
