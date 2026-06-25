import express from "express";
import {
  createGuest,
  getAllGuests,
  getGuestById,
  updateGuest,
  deleteGuest,
} from "../controllers/guest.controllers.js";
import upload from "../middlewares/multer.middleware.js";
import validateFileSize from "../middlewares/validateFileSize.middleware.js";

const router = express.Router();

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  createGuest
);
router.get("/", getAllGuests);
router.get("/:id", getGuestById);
router.put(
  "/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  updateGuest
);
router.delete("/:id", deleteGuest);

export default router;
