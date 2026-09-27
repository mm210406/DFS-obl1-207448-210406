import express from "express"; 
import {validateBodyMiddleware} from "../middlewares/validateBody.middleware.js"; 
import {reviewSchema} from "../validators/reviews.validators.js"; 
import {createReview, getReviews, getReviewById, updateReview, deleteReview} from "../controllers/reviews.controllers.js";
import {generateSummary} from "../controllers/ai.controllers.js";

const router = express.Router();
router.get("/", getReviews);
router.get("/:id", getReviewById);
router.post("/", validateBodyMiddleware(reviewSchema), createReview);
router.put("/:id", validateBodyMiddleware(reviewSchema), updateReview);
router.delete("/:id", deleteReview);
router.post("/:id/summary", generateSummary);

export default router;
