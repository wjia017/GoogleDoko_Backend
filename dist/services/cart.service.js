"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const repository_1 = require("../repository");
class CartService {
    async getCart(userId) {
        const cartItems = await repository_1.cartRepository.find({
            where: { userId },
            order: { addedAt: "DESC" },
        });
        if (cartItems.length === 0)
            return [];
        const productIds = cartItems.map((item) => item.productId);
        const products = await repository_1.productRepository.findByIds(productIds);
        const productMap = new Map(products.map((p) => [p.id, p]));
        return cartItems.map((item) => {
            const product = productMap.get(item.productId);
            return {
                userId: item.userId,
                productId: item.productId,
                quantity: item.quantity,
                addedAt: item.addedAt,
                ...(product ? { product } : {}),
            };
        });
    }
    async addToCart(userId, productId, quantity = 1) {
        const product = await repository_1.productRepository.findOne({
            where: { id: productId, active: 1 },
        });
        if (!product) {
            throw new Error("PRODUCT_NOT_FOUND");
        }
        const qty = Math.max(1, Number(quantity) || 1);
        const existingItem = await repository_1.cartRepository.findOne({
            where: { userId, productId },
        });
        if (existingItem) {
            existingItem.quantity += qty;
            await repository_1.cartRepository.save(existingItem);
        }
        else {
            const newItem = repository_1.cartRepository.create({
                userId,
                productId,
                quantity: qty,
            });
            await repository_1.cartRepository.save(newItem);
        }
        return await this.getCart(userId);
    }
    async updateQuantity(userId, productId, quantity) {
        const qty = Number(quantity);
        if (!qty || qty < 1) {
            return await this.removeFromCart(userId, productId);
        }
        const existingItem = await repository_1.cartRepository.findOne({
            where: { userId, productId },
        });
        if (!existingItem) {
            return await this.addToCart(userId, productId, qty);
        }
        existingItem.quantity = qty;
        await repository_1.cartRepository.save(existingItem);
        return await this.getCart(userId);
    }
    async removeFromCart(userId, productId) {
        await repository_1.cartRepository.delete({ userId, productId });
        return await this.getCart(userId);
    }
    async clearCart(userId) {
        await repository_1.cartRepository.delete({ userId });
        return [];
    }
}
exports.CartService = CartService;
exports.default = new CartService();
