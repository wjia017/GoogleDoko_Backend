"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rewards_controller_1 = __importDefault(require("../controllers/rewards.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const rewards_validator_1 = require("../validations/rewards.validator");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get("/", rewards_controller_1.default.getRewards);
router.post("/redeem", rewards_validator_1.redeemPointsValidator, validation_middleware_1.validateRequest, rewards_controller_1.default.redeemPoints);
exports.default = router;
