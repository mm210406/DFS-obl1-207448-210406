import express from "express"; 
import {validateBodyMiddleware} from "../middlewares/validateBody.middleware.js"; 
import {validateParamsMiddleware} from "../middlewares/validateParams.middleware.js";
import {reviewSchema} from "../validators/reviews.validators.js"; 
import {idParamSchema} from "../validators/common.validators.js";
import {createReview, getReviews, getReviewById, updateReview, deleteReview} from "../controllers/reviews.controllers.js";
import {generateSummary} from "../controllers/ai.controllers.js";

const router = express.Router();
router.get("/", getReviews);
router.get("/:id", validateParamsMiddleware(idParamSchema), getReviewById);
router.post("/", validateBodyMiddleware(reviewSchema), createReview);
router.put("/:id", validateParamsMiddleware(idParamSchema), validateBodyMiddleware(reviewSchema), updateReview);
router.delete("/:id", validateParamsMiddleware(idParamSchema), deleteReview);
router.post("/:id/summary", validateParamsMiddleware(idParamSchema), generateSummary);

export default router;
