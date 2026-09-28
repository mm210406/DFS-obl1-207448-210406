import Genre from "../models/genre.model.js";
import Review from "../models/review.model.js";

export const createGenreService = async (data) => {
  try {
    return await Genre.create(data);
  } catch (e) {
    if (e.code === 11000) {
      const x = new Error("El género ya existe");
      x.status = 409;
      throw x;
    }
    throw e;
  }
};

export const getGenresService = () => Genre.find().sort({ name: 1 });

export const getGenreByIdService = async (id) => {
  const g = await Genre.findById(id);
  if (!g) {
    const e = new Error("Género no encontrado");
    e.status = 404;
    throw e;
  }
  return g;
};

export const updateGenreService = async (id, data) => {
  const g = await Genre.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!g) {
    const e = new Error("Género no encontrado");
    e.status = 404;
    throw e;
  }
  return g;
};

export const deleteGenreService = async (id) => {
  if (await Review.exists({ genres: id })) {
    const e = new Error("No se puede eliminar un género utilizado por reseñas");
    e.status = 409;
    throw e;
  }
  const g = await Genre.findByIdAndDelete(id);
  if (!g) {
    const e = new Error("Género no encontrado");
    e.status = 404;
    throw e;
  }
  return g;
};
