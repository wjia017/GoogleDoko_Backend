"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewController = void 0;
const review_service_1 = __importDefault(require("../services/review.service"));
const response_helper_1 = require("../helpers/response.helper");
const message_helper_1 = require("../helpers/message.helper");
class ReviewController {
    async getProductReviews(req, res) {
        try {
            const productId = String(req.params.id || req.params.productId);
            const reviews = await review_service_1.default.getProductReviews(productId);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.review.retrieved, reviews);
        }
        catch (error) {
            console.error("Get product reviews error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async submitReview(req, res) {
        try {
            const userId = req.user.id;
            const { productId, rating, title, body } = req.body || {};
            const review = await review_service_1.default.addReview(String(productId), userId, Number(rating), title, body);
            (0, response_helper_1.sendSuccess)(res, 201, message_helper_1.messages.review.created, review);
        }
        catch (error) {
            if (error?.message === "PRODUCT_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.product.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async getAllReviews(_req, res) {
        try {
            const reviews = await review_service_1.default.getAllReviews();
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.review.retrieved, reviews);
        }
        catch (error) {
            console.error("Get all reviews error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async deleteReview(req, res) {
        try {
            const userId = req.user?.id;
            const role = String(req.user?.role || "");
            await review_service_1.default.deleteReview(Number(req.params.id), userId, role);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.review.deleted);
        }
        catch (error) {
            if (error?.message === "REVIEW_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.review.notFound);
                return;
            }
            if (error?.message === "FORBIDDEN") {
                (0, response_helper_1.sendError)(res, 403, message_helper_1.messages.common.forbidden);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
}
exports.ReviewController = ReviewController;
exports.default = new ReviewController();
