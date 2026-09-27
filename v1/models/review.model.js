import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    genreId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
    movieTitle: { type: String, required: true, trim: true },
    externalMovieId: { type: String, trim: true, default: "" },
    description: { type: String, required: true, trim: true },
    points: { type: Number, required: true, min: 1, max: 10 },
    imageUrl: { type: String, trim: true, default: "" },
    aiSummary: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Review", reviewSchema);
