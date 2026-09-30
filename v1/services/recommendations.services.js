import Review from "../models/review.model.js";
import User from "../models/user.model.js";
import Genre from "../models/genre.model.js";
import { generateRecommendationsService } from "./ai.services.js";
import { getCatalogService } from "./movies.services.js";

const MAX_RECOMMENDATIONS = 3;

const findMovieInCatalog = async (suggestion, excludedIds) => {
  const { movies } = await getCatalogService({ page: 1, title: suggestion.title });
  const candidates = movies.filter((movie) => !excludedIds.includes(movie.tmdbId));
  const sameYear = candidates.find(
    (movie) => suggestion.year && movie.releaseDate?.startsWith(String(suggestion.year)),
  );
  return sameYear || candidates[0];
};

export const updateRecommendationsService = async (userId) => {
  try {
    const reviews = await Review.find({ userId }).populate("genres", "name");
    const allowedGenres = await Genre.find({ allowed: true });

    const suggestions = await generateRecommendationsService(
      reviews.map((review) => ({
        title: review.movieTitle,
        points: review.points,
        genres: review.genres.map((genre) => genre.name),
        description: review.description,
        date: review.updatedAt.toISOString().split("T")[0],
      })),
      allowedGenres.map((genre) => genre.name),
    );

    const excludedIds = reviews.map((review) => review.tmdbId);
    const recommendations = [];

    for (const suggestion of suggestions) {
      if (recommendations.length === MAX_RECOMMENDATIONS) break;

      const movie = await findMovieInCatalog(suggestion, excludedIds);
      if (movie) {
        excludedIds.push(movie.tmdbId);
        recommendations.push({
          tmdbId: movie.tmdbId,
          title: movie.title,
          posterUrl: movie.posterUrl,
          reason: suggestion.reason,
        });
      }
    }

    if (recommendations.length === 0) {
      throw new Error("Ninguna recomendación está en el catálogo permitido");
    }

    await User.findByIdAndUpdate(userId, {
      recommendations,
      recommendationsUpdatedAt: new Date(),
    });
    return { available: true, items: recommendations };
  } catch (error) {
    console.error("Recomendaciones no disponibles:", error.message);
    return {
      available: false,
      items: [],
      mensaje: "Las recomendaciones no están disponibles en este momento",
    };
  }
};
