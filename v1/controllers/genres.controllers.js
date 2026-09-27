import * as service from "../services/genres.services.js";

export const createGenre = async (req, res) => {
    const genre = await service.createGenreService(
        req.validatedBody
    );
    res.status(201).json(genre);
};

export const getGenres = async (req, res) => {
    const genres = await service.getGenresService();
    res.json(genres);
};

export const getGenreById = async (req, res) => {
    const genre = await service.getGenreByIdService(
        req.params.id
    );
    res.json(genre);
};

export const updateGenre = async (req, res) => {
    const genre = await service.updateGenreService(
        req.params.id,
        req.validatedBody
    );
    res.json(genre);
};

export const deleteGenre = async (req, res) => {
    await service.deleteGenreService(req.params.id);
    res.json({
        mensaje: "Género eliminado"
    });
};
