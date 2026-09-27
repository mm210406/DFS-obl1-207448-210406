import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import Genre from "../models/genre.model.js";

export const createReviewService = async (userId, data) => {
  const user = await User.findById(userId);
  if (!user) {
    const e = new Error("Usuario no encontrado");
    e.status = 404;
    throw e;
  }
  if (!(await Genre.findById(data.genreId))) {
    const e = new Error("Género no encontrado");
    e.status = 404;
    throw e;
  }
  if (user.plan === "PLUS" && (await Review.countDocuments({ userId })) >= 4) {
    const e = new Error("El plan PLUS permite un máximo de 4 reseñas");
    e.status = 403;
    throw e;
  }
  return Review.create({ ...data, userId });
};

export const getReviewsService = async (userId, query) => {
  let page = parseInt(query.page) || 1, limit = parseInt(query.limit) || 10;
  if (page < 1) page = 1;
  if (limit < 1) limit = 10;
  if (limit > 50) limit = 50;

  const filter = { userId };

  if (query.genreId) filter.genreId = query.genreId;
  if (query.points) filter.points = Number(query.points);
  if (query.title) filter.movieTitle = { $regex: query.title, $options: "i" };
  const total = await Review.countDocuments(filter);
  const reviews = await Review.find(filter)
    .populate("genreId", "name")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit);
  return { page, limit, total, pages: Math.ceil(total / limit), reviews };
};

export const getReviewByIdService = async (userId, id) => {
  const r = await Review.findOne({ _id: id, userId }).populate(
    "genreId",
    "name",
  );
  if (!r) {
    const e = new Error("Reseña no encontrada");
    e.status = 404;
    throw e;
  }
  return r;
};

export const updateReviewService = async (userId, id, data) => {
  if (!(await Genre.findById(data.genreId))) {
    const e = new Error("Género no encontrado");
    e.status = 404;
    throw e;
  }
  const r = await Review.findOneAndUpdate({ _id: id, userId }, data, {
    new: true,
    runValidators: true,
  });
  if (!r) {
    const e = new Error("Reseña no encontrada");
    e.status = 404;
    throw e;
  }
  return r;
};

export const deleteReviewService = async (userId, id) => {
  const r = await Review.findOneAndDelete({ _id: id, userId });
  if (!r) {
    const e = new Error("Reseña no encontrada");
    e.status = 404;
    throw e;
  }
  return r;
};
