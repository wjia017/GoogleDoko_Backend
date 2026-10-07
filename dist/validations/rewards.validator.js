"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemPointsValidator = void 0;
const express_validator_1 = require("express-validator");
exports.redeemPointsValidator = [
    (0, express_validator_1.body)().custom((b) => {
        const amount = Number(b?.amount ?? b?.points);
        if (!amount || amount < 1) {
            throw new Error("Amount must be at least 1.");
        }
        return true;
    }),
];
