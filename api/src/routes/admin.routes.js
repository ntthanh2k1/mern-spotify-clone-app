import express from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controllers/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

// check user login and isAdmin before access routes
// clean code, better than implement each line
router.use(protectRoute, requireAdmin);

// Check admin
router.get("/", checkAdmin);

// Songs management
router.post("/songs", createSong);

router.delete("/songs/:id", deleteSong);

// Albums management
router.post("/albums", createAlbum);

router.delete("/albums/:id", deleteAlbum);

export default router;
