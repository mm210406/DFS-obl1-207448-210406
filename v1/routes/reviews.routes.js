import express from "express"; 
import {validateBodyMiddleware} from "../middlewares/validateBody.middleware.js"; 
import {validateParamsMiddleware} from "../middlewares/validateParams.middleware.js";
import {validateQueryMiddleware} from "../middlewares/validateQuery.middleware.js";
import {createReviewSchema, updateReviewSchema, reviewsQuerySchema} from "../validators/reviews.validators.js"; 
import {idParamSchema} from "../validators/common.validators.js";
import {createReview, getReviews, getReviewById, updateReview, deleteReview} from "../controllers/reviews.controllers.js";

const router = express.Router();
router.get("/", validateQueryMiddleware(reviewsQuerySchema), getReviews);
router.get("/:id", validateParamsMiddleware(idParamSchema), getReviewById);
router.post("/", validateBodyMiddleware(createReviewSchema), createReview);
router.patch("/:id", validateParamsMiddleware(idParamSchema), validateBodyMiddleware(updateReviewSchema), updateReview);
router.delete("/:id", validateParamsMiddleware(idParamSchema), deleteReview);

export default router;
