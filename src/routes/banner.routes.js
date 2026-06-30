import express from "express";
import {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
} from "../controllers/banner.controller.js";
import upload from "../middlewares/multer.middleware.js";
import validateFileSize from "../middlewares/validateFileSize.middleware.js";
const router = express.Router();

router.post(
  "/create",
  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,
  createBanner
);

router.get("/", getAllBanners);
router.get("/:id", getBannerById);
router.put("/:id",  upload.fields([{ name: "image", maxCount: 1 }]),
  validateFileSize,updateBanner);
router.delete("/:id", deleteBanner);

export default router;
