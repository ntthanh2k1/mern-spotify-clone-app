import express from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getSongById, getTrendingSongs } from "../controllers/song.controller.js";

export const router = express.Router();

router.get("/", getAllSongs);

router.get("/featured", getFeaturedSongs);

router.get("/made-for-you", getMadeForYouSongs);

router.get("/trending", getTrendingSongs);

router.get("/:id", getSongById);

export default router;
