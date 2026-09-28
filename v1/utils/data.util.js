import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = process.env.ADMIN_EMAIL || "admin@cinereview.com";
    const password = process.env.ADMIN_PASSWORD || "Admin123";

    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log(`El admin ${email} ya existe`);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUNDS) || 10);
    await User.create({
      name: "Administrador",
      email,
      password: hashedPassword,
      role: "ADMIN",
      plan: "PREMIUM",
    });
    console.log(`Admin creado: ${email}`);
  } catch (error) {
    console.error("Error al crear el admin:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

createAdmin();
