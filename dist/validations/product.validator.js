"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductValidator = exports.createProductValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createProductValidator = [
    (0, express_validator_1.body)("name")
        .trim()
        .notEmpty()
        .withMessage("Product name is required."),
    (0, express_validator_1.body)("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required."),
    (0, express_validator_1.body)("price")
        .isFloat({ gt: 0 })
        .withMessage("Price must be a valid positive number."),
    (0, express_validator_1.body)("weight")
        .trim()
        .notEmpty()
        .withMessage("Unit or weight is required (e.g. 1 kg, 500g)."),
];
exports.updateProductValidator = [
    (0, express_validator_1.body)("name").optional().trim().notEmpty().withMessage("Product name cannot be empty."),
    (0, express_validator_1.body)("category").optional().trim().notEmpty().withMessage("Category cannot be empty."),
    (0, express_validator_1.body)("price").optional().isFloat({ gt: 0 }).withMessage("Price must be a valid positive number."),
    (0, express_validator_1.body)("weight").optional().trim().notEmpty().withMessage("Unit or weight cannot be empty."),
];
