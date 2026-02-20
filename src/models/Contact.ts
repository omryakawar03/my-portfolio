import mongoose, { Schema, models } from "mongoose";

const ContactSchema = new Schema(
  {
   name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    fingerprint: {
      type: String,
      unique: true,index: true,
    },
  },
  { timestamps: true }
);

export default models.Contact || mongoose.model("Contact", ContactSchema);
