import { body } from "express-validator";

export const calculateCheckoutValidator = [
  body("items")
    .optional()
    .isArray()
    .withMessage("Items must be an array."),

  body("couponCode")
    .optional()
    .isString()
    .trim(),
];

export const validateCouponValidator = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Coupon code is required."),

  body("subtotal")
    .optional()
    .isNumeric()
    .withMessage("Subtotal must be a valid number."),
];
