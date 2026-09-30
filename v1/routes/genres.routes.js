import express from "express";
import { validateBodyMiddleware } from "../middlewares/validateBody.middleware.js";
import { validateParamsMiddleware } from "../middlewares/validateParams.middleware.js";
import { authorizeAdminMiddleware } from "../middlewares/authorize.middleware.js";
import { createGenreSchema, updateGenreSchema } from "../validators/genres.validators.js";
import { idParamSchema } from "../validators/common.validators.js";
import {
  createGenre,
  getGenres,
  getTmdbGenres,
  getGenreById,
  updateGenre,
  deleteGenre,
} from "../controllers/genres.controllers.js";

const router = express.Router();

router.get("/", getGenres);

router.get("/tmdb", authorizeAdminMiddleware, getTmdbGenres);

router.get("/:id", validateParamsMiddleware(idParamSchema), getGenreById);

router.post("/", authorizeAdminMiddleware, validateBodyMiddleware(createGenreSchema), createGenre);

router.patch(
  "/:id",
  authorizeAdminMiddleware,
  validateParamsMiddleware(idParamSchema),
  validateBodyMiddleware(updateGenreSchema),
  updateGenre,
);

router.delete(
  "/:id",
  authorizeAdminMiddleware,
  validateParamsMiddleware(idParamSchema),
  deleteGenre,
);

export default router;
