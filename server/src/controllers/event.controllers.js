import Event from "../models/event.model.js";
import asyncHandler from "../helpers/asyncHandler.js";
import compressImage from "../helpers/compressImage.js";
import fs from "fs";
import path from "path";
// Create Event
export const createEvent = asyncHandler(async (req, res) => {
  try {
    const { eventDate, eventTitle, eventDescription, eventStatus, city,state } =
      req.body || {};

    // 📸 image file (multer buffer based)
    const file = req.files?.image?.[0];

    console.log("FILE =>", file);

    if (!file?.buffer) {
      return res.status(400).json({
        success: false,
        message: "Event image is required",
      });
    }

    // 👉 compress + upload image (same like banner)
    const imagePath = await compressImage(file.buffer, "event");

    // console.log("IMAGE PATH =>", imagePath);

    // 🧠 type conversion (IMPORTANT)
    const episode = await Event.create({
      image: imagePath,
      eventDate,
      eventTitle,
      eventDescription,
      city,
      state,
      eventStatus: eventStatus || "Upcoming",
    });

    return res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: episode,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Get All Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Event
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Event
export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      message: "Event not found",
    });
  }

  let image = event.image;

  if (req.file) {
    if (event.image) {
      const oldPath = path.join(process.cwd(), event.image);

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const compressedPath = await compressImage(req.file.path);
    image = compressedPath.replace(/\\/g, "/");
  }

  const updatedEvent = await Event.findByIdAndUpdate(
    req.params.id,
    {
      image,
      eventDate: req.body.eventDate,
      eventTitle: req.body.eventTitle,
      eventDescription: req.body.eventDescription,
      city: req.body.city,
      state: req.body.state,
      eventStatus: req.body.eventStatus, // Added
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Event updated successfully",
    data: updatedEvent,
  });
});

// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
