import express from "express";
import { getAlbumById, getAllAlbums } from "../controllers/album.controller.js";

const router = express.Router();

router.get("/", getAllAlbums);

router.get("/:id", getAlbumById);

export default router;
