import express from "express";
import {
  createQuickLink,
  getQuickLinks,
  getQuickLinkById,
  updateQuickLink,
  deleteQuickLink,
} from "../controllers/quickLink.controller.js";
import upload from "../middlewares/multer.middleware.js";
import validateFileSize from "../middlewares/validateFileSize.middleware.js";
const router = express.Router();

router.post("/create", createQuickLink);
router.get("/", getQuickLinks);
router.get("/:id", getQuickLinkById);
router.put("/:id", updateQuickLink);
router.delete("/:id", deleteQuickLink);

export default router;