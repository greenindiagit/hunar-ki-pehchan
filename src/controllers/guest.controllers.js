import GuestModel from "../models/guest.models.js";
import asyncHandler from "../helpers/asyncHandler.js";
import compressImage from "../helpers/compressImage.js";
import fs from "fs";
import path from "path";

export const createGuest = asyncHandler(async (req, res) => {
  try {
    const { name, role, description, image } = req.body;

    const file = req.files?.image?.[0];

    console.log("FILE =>", file);

    if (!file?.buffer) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // 👉 same pattern as Brand (buffer-based processing)
    const imagePath = await compressImage(file.buffer, "guest");

    console.log("IMAGE PATH =>", imagePath);
    const guest = await GuestModel.create({
      name,
      role,
      description,
      image: imagePath,
    });
    return res.status(201).json({
      success: true,
      message: "Guest created successfully",
      data: guest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const getAllGuests = asyncHandler(async (req, res) => {
  const guests = await GuestModel.find().sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    data: guests,
  });
});

export const getGuestById = asyncHandler(async (req, res) => {
  const guest = await GuestModel.findById(req.params.id);

  if (!guest) {
    return res.status(404).json({
      success: false,
      message: "Guest not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: guest,
  });
});

export const updateGuest = asyncHandler(async (req, res) => {
  try {
    const { name, role, description } = req.body;

    const guest = await GuestModel.findById(req.params.id);

    if (!guest) {
      return res.status(404).json({
        success: false,
        message: "Guest not found",
      });
    }

    // Update basic fields
    guest.name = name || guest.name;
    guest.role = role || guest.role;
    guest.description = description || guest.description;

    // Check if new image uploaded
    const file = req.files?.image?.[0];

    if (file?.buffer) {
      // Delete old image
      if (guest.image) {
        const oldImagePath = path.join(process.cwd(), guest.image);

        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }

      // Compress & save new image
      const imagePath = await compressImage(file.buffer, "guest");
      guest.image = imagePath;
    }

    await guest.save();

    return res.status(200).json({
      success: true,
      message: "Guest updated successfully",
      data: guest,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export const deleteGuest = asyncHandler(async (req, res) => {
  const guest = await GuestModel.findByIdAndDelete(req.params.id);

  if (!guest) {
    return res.status(404).json({
      success: false,
      message: "Guest not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Guest deleted successfully",
  });
});
