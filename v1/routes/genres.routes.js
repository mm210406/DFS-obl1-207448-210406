import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { authorizeAdminMiddleware } from "../middlewares/authorize.middleware.js";
import { genreSchema } from "../validators/genres.validators.js";
import {
  createGenre,
  getGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} from "../controllers/genres.controllers.js";

const router = express.Router();

router.get("/", getGenres);

router.get("/:id", getGenreById);

router.post(
  "/",
  authorizeAdminMiddleware,
  validateBodyMiddleware(genreSchema),
  createGenre,
);

router.put(
  "/:id",
  authorizeAdminMiddleware,
  validateBodyMiddleware(genreSchema),
  updateGenre,
);

router.delete("/:id", authorizeAdminMiddleware, deleteGenre);

export default router;
