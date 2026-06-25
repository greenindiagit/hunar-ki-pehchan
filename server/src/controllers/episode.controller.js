import EpisodeModel from "../models/episode.model.js";
import asyncHandler from "../helpers/asyncHandler.js";
import compressImage from "../helpers/compressImage.js";
import fs from "fs";
import path from "path";
export const createEpisode = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      videoUrl,
      description,
      guestName,
      duration,
      views,
      isPopular,
      status,
    } = req.body || {};

    // 📸 image file (multer buffer based)
    const file = req.files?.image?.[0];

    console.log("FILE =>", file);

    if (!file?.buffer) {
      return res.status(400).json({
        success: false,
        message: "Episode image is required",
      });
    }

    // 👉 compress + upload image (same like banner)
    const imagePath = await compressImage(file.buffer, "episodes");

    // console.log("IMAGE PATH =>", imagePath);

    // 🧠 type conversion (IMPORTANT)
    const episode = await EpisodeModel.create({
      title,
      image: imagePath,
      videoUrl,
      description,
      guestName,
      duration,
      views: Number(views) || 0,
      isPopular: isPopular === "true" || isPopular === true,
      status: status === "true" || status === true,
    });

    return res.status(201).json({
      success: true,
      message: "Episode created successfully",
      data: episode,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const getAllEpisodes = asyncHandler(async (req, res) => {
  const episodes = await EpisodeModel.find().sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    data: episodes,
  });
});

export const getEpisodeById = asyncHandler(async (req, res) => {
  const episode = await EpisodeModel.findById(req.params.id);

  if (!episode) {
    return res.status(404).json({
      success: false,
      message: "Episode not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: episode,
  });
});

export const updateEpisode = asyncHandler(async (req, res) => {
  const episode = await EpisodeModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  if (!episode) {
    return res.status(404).json({
      success: false,
      message: "Episode not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Episode updated successfully",
    data: episode,
  });
});

export const deleteEpisode = asyncHandler(async (req, res) => {
  const episode = await EpisodeModel.findByIdAndDelete(req.params.id);

  if (!episode) {
    return res.status(404).json({
      success: false,
      message: "Episode not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Episode deleted successfully",
  });
});
