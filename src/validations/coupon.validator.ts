import { body } from "express-validator";

export const createCouponValidator = [
  body("code")
    .trim()
    .notEmpty()
    .withMessage("Coupon code is required."),

  body().custom((b) => {
    const val = b.discount_value !== undefined ? b.discount_value : b.discountValue;
    if (val === undefined || Number(val) <= 0) {
      throw new Error("Discount value must be greater than 0.");
    }
    return true;
  }),
];
