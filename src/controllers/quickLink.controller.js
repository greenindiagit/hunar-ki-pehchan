import QuickModel from "../models/quickLink.model.js";
import asyncHandler from "../helpers/asyncHandler.js";

// Create
export const createQuickLink = asyncHandler(async (req, res) => {
  const { title, effectiveDate, description, type, status } = req.body;

  const data = await QuickModel.create({
    title,
    effectiveDate,
    description,
    type,
    status,
  });

  res.status(201).json({
    success: true,
    message: "Quick Link created successfully",
    data,
  });
});

// Get All
export const getQuickLinks = asyncHandler(async (req, res) => {
  const data = await QuickModel.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: data.length,
    data,
  });
});

// Get By Id
export const getQuickLinkById = asyncHandler(async (req, res) => {
  const data = await QuickModel.findById(req.params.id);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Quick Link not found",
    });
  }

  res.status(200).json({
    success: true,
    data,
  });
});

// Update
export const updateQuickLink = asyncHandler(async (req, res) => {
  const { title, effectiveDate, description, type, status } = req.body;

  const data = await QuickModel.findByIdAndUpdate(
    req.params.id,
    {
      title,
      effectiveDate,
      description,
      type,
      status,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Quick Link not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Quick Link updated successfully",
    data,
  });
});

// Delete
export const deleteQuickLink = asyncHandler(async (req, res) => {
  const data = await QuickModel.findByIdAndDelete(req.params.id);

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "Quick Link not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Quick Link deleted successfully",
  });
});