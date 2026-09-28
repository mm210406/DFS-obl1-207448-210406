import "dotenv/config";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import Genre from "../models/genre.model.js";

const TMDB_GENRES = [
  { tmdbId: 28, name: "Acción" },
  { tmdbId: 12, name: "Aventura" },
  { tmdbId: 16, name: "Animación" },
  { tmdbId: 35, name: "Comedia" },
  { tmdbId: 80, name: "Crimen" },
  { tmdbId: 99, name: "Documental" },
  { tmdbId: 18, name: "Drama" },
  { tmdbId: 10751, name: "Familia" },
  { tmdbId: 14, name: "Fantasía" },
  { tmdbId: 36, name: "Historia" },
  { tmdbId: 27, name: "Terror", allowed: false },
  { tmdbId: 10402, name: "Música" },
  { tmdbId: 9648, name: "Misterio" },
  { tmdbId: 10749, name: "Romance" },
  { tmdbId: 878, name: "Ciencia ficción" },
  { tmdbId: 10770, name: "Película de TV" },
  { tmdbId: 53, name: "Suspense" },
  { tmdbId: 10752, name: "Bélica" },
  { tmdbId: 37, name: "Western" },
];

const createAdmin = async () => {
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
};

const createGenres = async () => {
  let createdCount = 0;

  for (const genre of TMDB_GENRES) {
    const existingGenre = await Genre.findOne({ tmdbId: genre.tmdbId });
    if (!existingGenre) {
      await Genre.create(genre);
      createdCount++;
    }
  }

  console.log(`Géneros creados: ${createdCount} (ya existían ${TMDB_GENRES.length - createdCount})`);
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await createAdmin();
    await createGenres();
  } catch (error) {
    console.error("Error al cargar los datos iniciales:", error.message);
  } finally {
    await mongoose.disconnect();
  }
};

seedDatabase();
