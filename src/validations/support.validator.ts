import { body } from "express-validator";

export const supportInquiryValidator = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required."),

  body().custom((b) => {
    const mail = b.gmail || b.email;
    if (!mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(mail).trim())) {
      throw new Error("Please enter a valid email address.");
    }
    const tel = b.contactNumber || b.phone;
    if (!tel || !String(tel).trim()) {
      throw new Error("Contact number is required.");
    }
    if (!b.inquiry && !b.message) {
      throw new Error("Inquiry message cannot be empty.");
    }
    return true;
  }),
];

export const subscriberValidator = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address."),
];
