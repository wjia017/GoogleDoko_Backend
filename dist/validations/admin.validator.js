"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSupportStatusValidator = exports.updateSettingsValidator = void 0;
const express_validator_1 = require("express-validator");
exports.updateSettingsValidator = [
    (0, express_validator_1.body)().custom((b) => {
        if (!b || typeof b !== "object" || Array.isArray(b)) {
            throw new Error("Settings body must be a valid key-value object.");
        }
        return true;
    }),
];
exports.updateSupportStatusValidator = [
    (0, express_validator_1.body)("status")
        .notEmpty()
        .withMessage("Status is required.")
        .isIn(["Open", "Resolved", "open", "resolved"])
        .withMessage("Invalid status."),
];
