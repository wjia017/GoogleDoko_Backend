"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const repository_1 = require("../repository");
class ReviewService {
    async getProductReviews(productId) {
        const reviews = await repository_1.reviewRepository.find({
            where: { productId },
            order: { createdAt: "DESC" },
        });
        if (reviews.length === 0)
            return [];
        const userIds = reviews.map((r) => r.userId);
        const users = await repository_1.userRepository.findByIds(userIds);
        const userMap = new Map(users.map((u) => [u.id, `${u.firstName} ${u.lastName}`.trim()]));
        return reviews.map((r) => ({
            id: r.id,
            productId: r.productId,
            userId: r.userId,
            author: userMap.get(r.userId) || "Verified Buyer",
            rating: r.rating,
            title: r.title,
            body: r.body,
            createdAt: r.createdAt,
        }));
    }
    async getUserReviews(userId) {
        return await repository_1.reviewRepository.find({
            where: { userId },
            order: { createdAt: "DESC" },
        });
    }
    async getAllReviews() {
        const reviews = await repository_1.reviewRepository.find({
            order: { createdAt: "DESC" },
        });
        const userIds = reviews.map((r) => r.userId);
        const users = await repository_1.userRepository.findByIds(userIds);
        const userMap = new Map(users.map((u) => [u.id, `${u.firstName} ${u.lastName}`.trim()]));
        return reviews.map((r) => ({
            id: r.id,
            productId: r.productId,
            userId: r.userId,
            author: userMap.get(r.userId) || "Customer",
            rating: r.rating,
            title: r.title,
            body: r.body,
            createdAt: r.createdAt,
        }));
    }
    async addReview(productId, userId, rating, title, body) {
        const product = await repository_1.productRepository.findOne({
            where: { id: productId },
        });
        if (!product) {
            throw new Error("PRODUCT_NOT_FOUND");
        }
        const cleanRating = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));
        const review = repository_1.reviewRepository.create({
            productId,
            userId,
            rating: cleanRating,
            title: title || "",
            body: body || "",
        });
        const savedReview = await repository_1.reviewRepository.save(review);
        // Award reward points for review
        try {
            const user = await repository_1.userRepository.findOne({ where: { id: userId } });
            if (user) {
                user.rewardPoints = (user.rewardPoints || 0) + 70;
                await repository_1.userRepository.save(user);
                const log = repository_1.rewardLogRepository.create({
                    userId,
                    label: `Review for "${product.name}"`,
                    points: 70,
                });
                await repository_1.rewardLogRepository.save(log);
            }
        }
        catch {
            // Non-critical reward logging
        }
        // Recompute product average rating
        try {
            const productReviews = await repository_1.reviewRepository.find({ where: { productId } });
            const avg = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
            product.rating = Math.round(avg * 10) / 10;
            await repository_1.productRepository.save(product);
        }
        catch {
            // Non-critical rating computation
        }
        return savedReview;
    }
    async deleteReview(id, userId, role) {
        const review = await repository_1.reviewRepository.findOne({
            where: { id },
        });
        if (!review) {
            throw new Error("REVIEW_NOT_FOUND");
        }
        if (role !== "admin" && userId && review.userId !== userId) {
            throw new Error("FORBIDDEN");
        }
        const productId = review.productId;
        await repository_1.reviewRepository.remove(review);
        // Recompute product average rating
        try {
            const remaining = await repository_1.reviewRepository.find({ where: { productId } });
            const product = await repository_1.productRepository.findOne({ where: { id: productId } });
            if (product) {
                if (remaining.length > 0) {
                    const avg = remaining.reduce((sum, r) => sum + r.rating, 0) / remaining.length;
                    product.rating = Math.round(avg * 10) / 10;
                }
                else {
                    product.rating = 4.8;
                }
                await repository_1.productRepository.save(product);
            }
        }
        catch {
            // Continue
        }
    }
}
exports.ReviewService = ReviewService;
exports.default = new ReviewService();
