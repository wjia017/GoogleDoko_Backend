"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAddressValidator = exports.createAddressValidator = void 0;
const express_validator_1 = require("express-validator");
exports.createAddressValidator = [
    (0, express_validator_1.body)("fullName")
        .trim()
        .notEmpty()
        .withMessage("Full name is required."),
    (0, express_validator_1.body)("phone")
        .trim()
        .notEmpty()
        .withMessage("Phone number is required."),
    (0, express_validator_1.body)("city")
        .trim()
        .notEmpty()
        .withMessage("City is required."),
];
exports.updateAddressValidator = [
    (0, express_validator_1.body)("fullName").optional().trim().notEmpty().withMessage("Full name cannot be empty."),
    (0, express_validator_1.body)("phone").optional().trim().notEmpty().withMessage("Phone number cannot be empty."),
    (0, express_validator_1.body)("city").optional().trim().notEmpty().withMessage("City cannot be empty."),
];
