import { In } from "typeorm";
import { wishlistRepository, productRepository } from "../repository";

export interface EnrichedWishlistItem {
  id: string;
  productId: string;
  userId: number;
  name: string;
  category: string;
  weight: string;
  price: number;
  rating: number;
  sold: string;
  origin: string;
  seller: string;
  image: string;
  gallery: string[];
  addedAt: Date;
  product?: any;
}

export class WishlistService {
  async getWishlist(userId: number): Promise<EnrichedWishlistItem[]> {
    if (!userId) return [];

    const wishlistItems = await wishlistRepository.find({
      where: { userId },
      order: { addedAt: "DESC" },
    });

    if (wishlistItems.length === 0) return [];

    const productIds = wishlistItems.map((item) => item.productId);
    const products =
      productIds.length > 0
        ? await productRepository.find({ where: { id: In(productIds) } })
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
