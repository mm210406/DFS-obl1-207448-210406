import { searchMoviesService } from "../services/movies.services.js";

export const searchMovies = async (req, res) => {
    if (!req.query.title) {
        return res.status(400).json({
            mensaje: "El parámetro title es obligatorio"
        });
    }

    const movies = await searchMoviesService(
        req.query.title
    );

    res.json(movies);
};
