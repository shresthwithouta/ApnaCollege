import mongoose, { Schema } from "mongoose";

const tagSchema = new Schema(
  {
    name: { type: String, required: true },
    visibility: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Tag ||
  mongoose.model("Tag", tagSchema);
