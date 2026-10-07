import {
  reviewRepository,
  productRepository,
  userRepository,
  rewardLogRepository,
} from "../repository";

import { Review } from "../entities/review.entity";

export class ReviewService {
  async getProductReviews(productId: string): Promise<any[]> {
    const reviews = await reviewRepository.find({
      where: { productId },
      order: { createdAt: "DESC" },
    });

    if (reviews.length === 0) return [];

    const userIds = reviews.map((r) => r.userId);
    const users = await userRepository.findByIds(userIds);
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

  async getUserReviews(userId: number): Promise<Review[]> {
    return await reviewRepository.find({
      where: { userId },
      order: { createdAt: "DESC" },
    });
  }

  async getAllReviews(): Promise<any[]> {
    const reviews = await reviewRepository.find({
      order: { createdAt: "DESC" },
    });

    const userIds = reviews.map((r) => r.userId);
    const users = await userRepository.findByIds(userIds);
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

  async addReview(
    productId: string,
    userId: number,
    rating: number,
    title?: string,
    body?: string
  ): Promise<Review> {
    const product = await productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    const cleanRating = Math.max(1, Math.min(5, Math.round(Number(rating) || 5)));

    const review = reviewRepository.create({
      productId,
      userId,
      rating: cleanRating,
      title: title || "",
      body: body || "",
    });

    const savedReview = await reviewRepository.save(review);

    // Award reward points for review
    try {
      const user = await userRepository.findOne({ where: { id: userId } });
      if (user) {
        user.rewardPoints = (user.rewardPoints || 0) + 70;
        await userRepository.save(user);

        const log = rewardLogRepository.create({
          userId,
          label: `Review for "${product.name}"`,
          points: 70,
        });
        await rewardLogRepository.save(log);
      }
    } catch {
      // Non-critical reward logging
    }

    // Recompute product average rating
    try {
      const productReviews = await reviewRepository.find({ where: { productId } });
      const avg =
        productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length;
      product.rating = Math.round(avg * 10) / 10;
      await productRepository.save(product);
    } catch {
      // Non-critical rating computation
    }

    return savedReview;
  }

  async deleteReview(
    id: number,
    userId?: number,
    role?: string
  ): Promise<void> {
    const review = await reviewRepository.findOne({
      where: { id },
    });

    if (!review) {
      throw new Error("REVIEW_NOT_FOUND");
    }

    if (role !== "admin" && userId && review.userId !== userId) {
      throw new Error("FORBIDDEN");
    }

    const productId = review.productId;
    await reviewRepository.remove(review);

    // Recompute product average rating
    try {
      const remaining = await reviewRepository.find({ where: { productId } });
      const product = await productRepository.findOne({ where: { id: productId } });
      if (product) {
        if (remaining.length > 0) {
          const avg = remaining.reduce((sum, r) => sum + r.rating, 0) / remaining.length;
          product.rating = Math.round(avg * 10) / 10;
        } else {
          product.rating = 4.8;
        }
        await productRepository.save(product);
      }
    } catch {
      // Continue
    }
  }
}

export default new ReviewService();
