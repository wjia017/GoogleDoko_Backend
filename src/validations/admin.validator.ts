import { body } from "express-validator";

export const updateSettingsValidator = [
  body().custom((b) => {
    if (!b || typeof b !== "object" || Array.isArray(b)) {
      throw new Error("Settings body must be a valid key-value object.");
    }
    return true;
  }),
];

export const updateSupportStatusValidator = [
  body("status")
    .notEmpty()
    .withMessage("Status is required.")
    .isIn(["Open", "Resolved", "open", "resolved"])
    .withMessage("Invalid status."),
];
