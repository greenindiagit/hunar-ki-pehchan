import BannerModel from "../models/banner.model.js";
import asyncHandler from "../helpers/asyncHandler.js";
import compressImage from "../helpers/compressImage.js";
import fs from "fs";
import path from "path";
// Create Banner


export const createBanner = asyncHandler(async (req, res) => {
  try {
    const { name, type } = req.body || {};

    const file = req.files?.image?.[0];

    console.log("FILE =>", file);

    if (!file?.buffer) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // 👉 same pattern as Brand (buffer-based processing)
    const imagePath = await compressImage(file.buffer, "banners");

    console.log("IMAGE PATH =>", imagePath);

    const banner = await BannerModel.create({
      name,
      type,
      image: imagePath,
    });

    return res.status(201).json({
      success: true,
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
// get all

export const getAllBanners = asyncHandler(async (req, res) => {
  const banners = await BannerModel.find().sort({ createdAt: 1 });

  return res.status(200).json({
    success: true,
    data: banners,
  });
});

// single banner

export const getBannerById = asyncHandler(async (req, res) => {
  const banner = await BannerModel.findById(req.params.id);

  if (!banner) {
    return res.status(404).json({
      success: false,
      message: "Banner not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: banner,
  });
});

// update banner
export const updateBanner = asyncHandler(async (req, res) => {
  const { name, type } = req.body;

  const updateData = {
    name,
    type,
  };

  if (req.file) {
    updateData.image = req.file.filename; // ya req.file.path
  }

  const banner = await BannerModel.findByIdAndUpdate(
    req.params.id,
    updateData,
    { new: true }
  );

  if (!banner) {
    return res.status(404).json({
      success: false,
      message: "Banner not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Banner updated successfully",
    data: banner,
  });
});

// delete banner
export const deleteBanner = asyncHandler(async (req, res) => {
  const banner = await BannerModel.findByIdAndDelete(req.params.id);

  if (!banner) {
    return res.status(404).json({
      success: false,
      message: "Banner not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Banner deleted successfully",
  });
});
