"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const review_controller_1 = __importDefault(require("../controllers/review.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const review_validator_1 = require("../validations/review.validator");
const router = (0, express_1.Router)();
router.get("/", review_controller_1.default.getAllReviews);
router.post("/", auth_middleware_1.authenticate, review_validator_1.createReviewValidator, validation_middleware_1.validateRequest, review_controller_1.default.submitReview);
router.delete("/:id", auth_middleware_1.authenticate, review_controller_1.default.deleteReview);
exports.default = router;
