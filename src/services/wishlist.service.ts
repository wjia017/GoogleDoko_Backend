import { wishlistRepository, productRepository } from "../repository";

export interface EnrichedWishlistItem {
  userId: number;
  productId: string;
  addedAt: Date;
  product?: any;
}

export class WishlistService {
  async getWishlist(userId: number): Promise<EnrichedWishlistItem[]> {
    const wishlistItems = await wishlistRepository.find({
      where: { userId },
      order: { addedAt: "DESC" },
    });

    if (wishlistItems.length === 0) return [];

    const productIds = wishlistItems.map((item) => item.productId);
    const products = await productRepository.findByIds(productIds);
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

  async addToWishlist(
    userId: number,
    productId: string
  ): Promise<EnrichedWishlistItem[]> {
    const product = await productRepository.findOne({
      where: { id: productId, active: 1 },
    });

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    const existing = await wishlistRepository.findOne({
      where: { userId, productId },
    });

    if (!existing) {
      const item = wishlistRepository.create({
        userId,
        productId,
      });
      await wishlistRepository.save(item);
    }

    return await this.getWishlist(userId);
  }

  async removeFromWishlist(
    userId: number,
    productId: string
  ): Promise<EnrichedWishlistItem[]> {
    await wishlistRepository.delete({ userId, productId });
    return await this.getWishlist(userId);
  }

  async toggleWishlist(
    userId: number,
    productId: string
  ): Promise<{ inWishlist: boolean; items: EnrichedWishlistItem[] }> {
    const existing = await wishlistRepository.findOne({
      where: { userId, productId },
    });

    if (existing) {
      await wishlistRepository.remove(existing);
      const items = await this.getWishlist(userId);
      return { inWishlist: false, items };
    } else {
      const items = await this.addToWishlist(userId, productId);
      return { inWishlist: true, items };
    }
  }
}

export default new WishlistService();
