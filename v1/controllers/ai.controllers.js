import Review from "../models/review.model.js";
import { generateReviewSummaryService } from "../services/ai.services.js";

export const generateSummary = async (req, res) => {

    const review = await Review.findOne({
        _id: req.params.id,
        userId: req.user.userId
    });

    if (!review) {
        return res.status(404).json({
            mensaje: "Reseña no encontrada"
        });
    }

    const result = await generateReviewSummaryService(review);

    if (result.available) {
        review.aiSummary = result.summary;
        await review.save();
    }

    res.json(result);
};