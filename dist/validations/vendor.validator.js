"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVendorStatusValidator = exports.vendorProductValidator = void 0;
const express_validator_1 = require("express-validator");
exports.vendorProductValidator = [
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
        .withMessage("Price must be a valid number greater than 0."),
    (0, express_validator_1.body)("weight")
        .trim()
        .notEmpty()
        .withMessage("Weight or unit description is required."),
];
exports.updateVendorStatusValidator = [
    (0, express_validator_1.body)("status")
        .notEmpty()
        .withMessage("Status is required.")
        .isIn(["approved", "under_review", "on_hold", "rejected"])
        .withMessage("Invalid vendor status."),
];
