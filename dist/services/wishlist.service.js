"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const repository_1 = require("../repository");
class WishlistService {
    async getWishlist(userId) {
        const wishlistItems = await repository_1.wishlistRepository.find({
            where: { userId },
            order: { addedAt: "DESC" },
        });
        if (wishlistItems.length === 0)
            return [];
        const productIds = wishlistItems.map((item) => item.productId);
        const products = await repository_1.productRepository.findByIds(productIds);
        const productMap = new Map(products.map((p) => [p.id, p]));
        return wishlistItems.map((item) => ({
            userId: item.userId,
            productId: item.productId,
            addedAt: item.addedAt,
            ...(productMap.get(item.productId)
                ? { product: productMap.get(item.productId) }
                : {}),
        }));
    }
    async addToWishlist(userId, productId) {
        const product = await repository_1.productRepository.findOne({
            where: { id: productId, active: 1 },
        });
        if (!product) {
            throw new Error("PRODUCT_NOT_FOUND");
        }
        const existing = await repository_1.wishlistRepository.findOne({
            where: { userId, productId },
        });
        if (!existing) {
            const item = repository_1.wishlistRepository.create({
                userId,
                productId,
            });
            await repository_1.wishlistRepository.save(item);
        }
        return await this.getWishlist(userId);
    }
    async removeFromWishlist(userId, productId) {
        await repository_1.wishlistRepository.delete({ userId, productId });
        return await this.getWishlist(userId);
    }
    async toggleWishlist(userId, productId) {
        const existing = await repository_1.wishlistRepository.findOne({
            where: { userId, productId },
        });
        if (existing) {
            await repository_1.wishlistRepository.remove(existing);
            const items = await this.getWishlist(userId);
            return { inWishlist: false, items };
        }
        else {
            const items = await this.addToWishlist(userId, productId);
            return { inWishlist: true, items };
        }
    }
}
exports.WishlistService = WishlistService;
exports.default = new WishlistService();
