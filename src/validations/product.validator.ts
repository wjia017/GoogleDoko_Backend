import { body } from "express-validator";

export const createProductValidator = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required."),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required."),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a valid positive number."),

  body("weight")
    .trim()
    .notEmpty()
    .withMessage("Unit or weight is required (e.g. 1 kg, 500g)."),
];

export const updateProductValidator = [
  body("name").optional().trim().notEmpty().withMessage("Product name cannot be empty."),
  body("category").optional().trim().notEmpty().withMessage("Category cannot be empty."),
  body("price").optional().isFloat({ gt: 0 }).withMessage("Price must be a valid positive number."),
  body("weight").optional().trim().notEmpty().withMessage("Unit or weight cannot be empty."),
];
