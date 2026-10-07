import { body } from "express-validator";

export const vendorProductValidator = [
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
    .withMessage("Price must be a valid number greater than 0."),

  body("weight")
    .trim()
    .notEmpty()
    .withMessage("Weight or unit description is required."),
];

export const updateVendorStatusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["approved", "under_review", "on_hold", "rejected"])
    .withMessage("Invalid vendor status."),
];
