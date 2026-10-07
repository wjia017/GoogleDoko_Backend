"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const cart_service_1 = __importDefault(require("../services/cart.service"));
const response_helper_1 = require("../helpers/response.helper");
const message_helper_1 = require("../helpers/message.helper");
class CartController {
    async getCart(req, res) {
        try {
            const userId = req.user.id;
            const items = await cart_service_1.default.getCart(userId);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.cart.retrieved, items);
        }
        catch (error) {
            console.error("Get cart error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async addToCart(req, res) {
        try {
            const userId = req.user.id;
            const { productId, quantity = 1 } = req.body || {};
            const items = await cart_service_1.default.addToCart(userId, String(productId), quantity);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.cart.itemAdded, items);
        }
        catch (error) {
            if (error?.message === "PRODUCT_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.product.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async updateQuantity(req, res) {
        try {
            const userId = req.user.id;
            const { quantity } = req.body || {};
            const items = await cart_service_1.default.updateQuantity(userId, String(req.params.productId), quantity);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.cart.quantityUpdated, items);
        }
        catch (error) {
            console.error("Update quantity error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async removeItem(req, res) {
        try {
            const userId = req.user.id;
            const items = await cart_service_1.default.removeFromCart(userId, String(req.params.productId));
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.cart.itemRemoved, items);
        }
        catch (error) {
            console.error("Remove cart item error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async clearCart(req, res) {
        try {
            const userId = req.user.id;
            const items = await cart_service_1.default.clearCart(userId);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.cart.cleared, items);
        }
        catch (error) {
            console.error("Clear cart error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
}
exports.CartController = CartController;
exports.default = new CartController();
