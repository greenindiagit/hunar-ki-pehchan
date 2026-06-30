import express from "express";
import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controllers.js";

import upload from "../middlewares/multer.middleware.js";
import validateFileSize from "../middlewares/validateFileSize.middleware.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  createEvent
);
router.get("/", getEvents);
router.get("/:id", getEventById);
router.put(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  updateEvent
);
router.delete("/:id", deleteEvent);

export default router;
