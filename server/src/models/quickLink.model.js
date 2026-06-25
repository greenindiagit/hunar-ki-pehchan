import mongoose from "mongoose";

const quickLinkSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Privacy Policy",
      trim: true,
    },
    effectiveDate: {
      type: Date,
      required: true,
    },
    description: {
      type: String, // HTML content support
      required: true,
    },
    type: {
      type: String,
      enum: ["Privacy Policy", "Terms & Conditions", "Disclaimer"],
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const QuickLinkModel = mongoose.model("quickLink", quickLinkSchema);

export default QuickLinkModel;
