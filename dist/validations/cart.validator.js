"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartQuantityValidator = exports.addToCartValidator = void 0;
const express_validator_1 = require("express-validator");
exports.addToCartValidator = [
    (0, express_validator_1.body)("productId")
        .trim()
        .notEmpty()
        .withMessage("Product ID is required."),
    (0, express_validator_1.body)("quantity")
        .optional()
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1."),
];
exports.updateCartQuantityValidator = [
    (0, express_validator_1.body)("quantity")
        .notEmpty()
        .withMessage("Quantity is required.")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1."),
];
