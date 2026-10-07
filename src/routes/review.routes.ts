import { Router } from "express";
import reviewController from "../controllers/review.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validation.middleware";
import { createReviewValidator } from "../validations/review.validator";

const router = Router();

router.get("/", reviewController.getAllReviews);

router.post(
  "/",
  authenticate,
  createReviewValidator,
  validateRequest,
  reviewController.submitReview
);

router.delete(
  "/:id",
  authenticate,
  reviewController.deleteReview
);

export default router;
