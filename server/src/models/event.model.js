import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventTitle: {
      type: String,
      required: true,
      trim: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    eventStatus: {
      type: String,
      required: true,
      trim: true,
      enum: ["Upcoming", "Ongoing", "Completed", "Cancelled"],
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
     state: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Event", eventSchema);
