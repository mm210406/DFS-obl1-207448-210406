import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    plan: { type: String, enum: ["PLUS", "PREMIUM"], default: "PLUS" },
    role: { type: String, enum: ["CLIENT", "ADMIN"], default: "CLIENT" },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
