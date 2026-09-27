import * as service from "../services/reviews.services.js";

export const createReview = async (req, res) => {

    const review = await service.createReviewService(
        req.user.userId,
        req.validatedBody
    );

    res.status(201).json(review);
};


export const getReviews = async (req, res) => {

    const reviews = await service.getReviewsService(
        req.user.userId,
        req.query
    );

    res.json(reviews);
};


export const getReviewById = async (req, res) => {

    const review = await service.getReviewByIdService(
        req.user.userId,
        req.params.id
    );

    res.json(review);
};


export const updateReview = async (req, res) => {

    const review = await service.updateReviewService(
        req.user.userId,
        req.params.id,
        req.validatedBody
    );

    res.json(review);
};


export const deleteReview = async (req, res) => {

    await service.deleteReviewService(
        req.user.userId,
        req.params.id
    );

    res.json({
        mensaje: "Reseña eliminada"
    });
};