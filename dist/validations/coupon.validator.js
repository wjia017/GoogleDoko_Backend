"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCouponValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createCouponValidator = [
    (0, express_validator_1.body)("code")
        .trim()
        .notEmpty()
        .withMessage("Coupon code is required."),
    (0, express_validator_1.body)().custom((b) => {
        const val = b.discount_value !== undefined ? b.discount_value : b.discountValue;
        if (val === undefined || Number(val) <= 0) {
            throw new Error("Discount value must be greater than 0.");
        }
        return true;
    }),
];
