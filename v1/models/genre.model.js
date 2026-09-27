import mongoose from "mongoose";

const genreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Genre", genreSchema);
