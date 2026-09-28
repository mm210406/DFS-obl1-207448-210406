import mongoose from "mongoose";

const genreSchema = new mongoose.Schema(
  {
    tmdbId: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true, trim: true },
    allowed: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default mongoose.model("Genre", genreSchema);
