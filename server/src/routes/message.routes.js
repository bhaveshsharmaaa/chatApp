import express from "express";
import { protectedRoute } from "../middlewares/auth.middleware.js";
import {
  getMessages,
  getStreamToken,
  getUsersForSidebar,
  sendMessage,
} from "../controllers/message.controllers.js";

const router = express.Router();

router.get("/users", protectedRoute, getUsersForSidebar);
router.get("/token", protectedRoute, getStreamToken);
router.post("/send/:id", protectedRoute, sendMessage);
router.get("/:id", protectedRoute, getMessages);

export default router;
