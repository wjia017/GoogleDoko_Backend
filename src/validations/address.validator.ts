import { body } from "express-validator";

export const createAddressValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required."),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required."),

  body("city")
    .trim()
    .notEmpty()
    .withMessage("City is required."),
];

export const updateAddressValidator = [
  body("fullName").optional().trim().notEmpty().withMessage("Full name cannot be empty."),
  body("phone").optional().trim().notEmpty().withMessage("Phone number cannot be empty."),
  body("city").optional().trim().notEmpty().withMessage("City cannot be empty."),
];
