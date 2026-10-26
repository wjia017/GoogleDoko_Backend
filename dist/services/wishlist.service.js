"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const typeorm_1 = require("typeorm");
const repository_1 = require("../repository");
class WishlistService {
    async getWishlist(userId) {
        if (!userId)
            return [];
        const wishlistItems = await repository_1.wishlistRepository.find({
            where: { userId },
            order: { addedAt: "DESC" },
        });
        if (wishlistItems.length === 0)
            return [];
        const productIds = wishlistItems.map((item) => item.productId);
        const products = productIds.length > 0
            ? await repository_1.productRepository.find({ where: { id: (0, typeorm_1.In)(productIds) } })
            : [];
        const productMap = new Map(products.map((p) => [p.id, p]));
        return wishlistItems.map((item) => {
            const product = productMap.get(item.productId);
            return {
                id: String(item.productId),
                productId: String(item.productId),
                userId: item.userId,
                name: product?.name || "Product",
                category: product?.category || "",
                weight: product?.weight || "1 kg",
                price: Number(product?.price || 0),
                rating: Number(product?.rating || 5),
                sold: product?.sold || "0",
                origin: product?.origin || "",
                seller: product?.seller || "",
                image: product?.image || "",
                gallery: product?.image ? [product.image] : [],
                addedAt: item.addedAt,
                ...(product ? { product } : {}),
            };
        });
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
