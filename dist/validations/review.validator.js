"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReviewValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createReviewValidator = [
    (0, express_validator_1.body)("productId")
        .trim()
        .notEmpty()
        .withMessage("Product ID is required."),
    (0, express_validator_1.body)("rating")
        .isInt({ min: 1, max: 5 })
        .withMessage("Rating must be an integer between 1 and 5."),
    (0, express_validator_1.body)("title").optional().trim(),
    (0, express_validator_1.body)("body").optional().trim(),
];
