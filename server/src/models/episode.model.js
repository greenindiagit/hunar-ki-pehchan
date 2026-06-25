import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      required: true,
    },

    videoUrl: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    guestName: {
      type: String,
      default: "",
      trim: true,
    },

    duration: {
      type: String,
      default: "",
    },

    views: {
      type: Number,
      default: 0,
    },

    isPopular: {
      type: Boolean,
      default: true,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const EpisodeModel = mongoose.model("Episode", episodeSchema);

export default EpisodeModel;
