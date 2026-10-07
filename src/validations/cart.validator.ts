import { body } from "express-validator";

export const addToCartValidator = [
  body("productId")
    .trim()
    .notEmpty()
    .withMessage("Product ID is required."),

  body("quantity")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),
];

export const updateCartQuantityValidator = [
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required.")
    .isInt({ min: 1 })
    .withMessage("Quantity must be at least 1."),
];
