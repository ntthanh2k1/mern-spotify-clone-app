import express from "express";
import { getAllStats } from "../controllers/stat.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, requireAdmin, getAllStats);

export default router;
