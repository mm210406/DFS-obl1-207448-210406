import User from "../models/user.model.js";
import Review from "../models/review.model.js";
import { buildAuthResponse } from "./auth.services.js";
import { PLUS_REVIEW_LIMIT } from "./reviews.services.js";
import { createError } from "../utils/error.util.js";

const findUserById = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw createError(404, "Usuario no encontrado");
  }
  return user;
};

export const getProfileService = async (userId) => {
  const user = await findUserById(userId);
  const reviewCount = await Review.countDocuments({ userId });
  const limit = user.plan === "PLUS" ? PLUS_REVIEW_LIMIT : null;

  return {
    user: buildAuthResponse(user).user,
    usage: {
      reviews: reviewCount,
      limit,
      percentage: limit ? Math.round((reviewCount / limit) * 100) : null,
    },
    recommendations: user.recommendations,
    recommendationsUpdatedAt: user.recommendationsUpdatedAt,
  };
};

export const upgradePlanService = async (userId) => {
  const user = await findUserById(userId);

  if (user.role === "ADMIN") {
    throw createError(403, "El administrador no gestiona planes");
  }
  if (user.plan === "PREMIUM") {
    throw createError(400, "El usuario ya tiene plan PREMIUM");
  }

  user.plan = "PREMIUM";
  await user.save();
  return buildAuthResponse(user);
};
