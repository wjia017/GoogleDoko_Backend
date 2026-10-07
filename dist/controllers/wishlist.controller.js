"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistController = void 0;
const wishlist_service_1 = __importDefault(require("../services/wishlist.service"));
const response_helper_1 = require("../helpers/response.helper");
const message_helper_1 = require("../helpers/message.helper");
class WishlistController {
    async getWishlist(req, res) {
        try {
            const userId = req.user.id;
            const items = await wishlist_service_1.default.getWishlist(userId);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.wishlist.retrieved, items);
        }
        catch (error) {
            console.error("Get wishlist error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async addToWishlist(req, res) {
        try {
            const userId = req.user.id;
            const productId = String(req.params.productId);
            const items = await wishlist_service_1.default.addToWishlist(userId, productId);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.wishlist.itemAdded, items);
        }
        catch (error) {
            if (error?.message === "PRODUCT_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.product.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async removeFromWishlist(req, res) {
        try {
            const userId = req.user.id;
            const productId = String(req.params.productId);
            const items = await wishlist_service_1.default.removeFromWishlist(userId, productId);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.wishlist.itemRemoved, items);
        }
        catch (error) {
            console.error("Remove from wishlist error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async toggleWishlist(req, res) {
        try {
            const userId = req.user.id;
            const productId = String(req.params.productId);
            const result = await wishlist_service_1.default.toggleWishlist(userId, productId);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.wishlist.toggled, result);
        }
        catch (error) {
            if (error?.message === "PRODUCT_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.product.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
}
exports.WishlistController = WishlistController;
exports.default = new WishlistController();
