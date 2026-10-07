import { body } from "express-validator";

export const createReviewValidator = [
  body("productId")
    .trim()
    .notEmpty()
    .withMessage("Product ID is required."),

  body("rating")
    .isInt({ min: 1, max: 5 })
    .withMessage("Rating must be an integer between 1 and 5."),

  body("title").optional().trim(),
  body("body").optional().trim(),
];
