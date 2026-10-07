"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCouponValidator = exports.calculateCheckoutValidator = void 0;
const express_validator_1 = require("express-validator");
exports.calculateCheckoutValidator = [
    (0, express_validator_1.body)("items")
        .optional()
        .isArray()
        .withMessage("Items must be an array."),
    (0, express_validator_1.body)("couponCode")
        .optional()
        .isString()
        .trim(),
];
exports.validateCouponValidator = [
    (0, express_validator_1.body)("code")
        .trim()
        .notEmpty()
        .withMessage("Coupon code is required."),
    (0, express_validator_1.body)("subtotal")
        .optional()
        .isNumeric()
        .withMessage("Subtotal must be a valid number."),
];
