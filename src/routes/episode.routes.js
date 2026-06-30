import express from "express";
import {
  createEpisode,
  getAllEpisodes,
  getEpisodeById,
  updateEpisode,
  deleteEpisode,
} from "../controllers/episode.controller.js";
import upload from "../middlewares/multer.middleware.js";
import validateFileSize from "../middlewares/validateFileSize.middleware.js";

const router = express.Router();
router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  createEpisode
);
router.get("/", getAllEpisodes);
router.get("/:id", getEpisodeById);
router.put(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  updateEpisode
);
router.delete("/:id", deleteEpisode);
export default router;
