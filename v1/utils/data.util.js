import 'dotenv/config';
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

async function debugInsert() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const passwordHash = await bcrypt.hash("Admin123", Number(process.env.SALT_ROUNDS));

    const adminUser = await User.findOne({
      $or: [
        { email: "admin@cinereview.com" },
      ],
    });

    if (!adminUser) {
      const newAdmin = new User({
        name: "admin",
        email: "admin@cinereview.com",
        passwordHash,
        role: "admin",
        plan: "premium",
      });

      const saved = await newAdmin.save();
    } 
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await mongoose.disconnect();
  }
}

debugInsert();