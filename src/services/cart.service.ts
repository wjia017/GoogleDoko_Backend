import { cartRepository, productRepository } from "../repository";
import { Cart } from "../entities/cart.entity";

export interface EnrichedCartItem {
  userId: number;
  productId: string;
  quantity: number;
  addedAt: Date;
  product?: any;
}

export class CartService {
  async getCart(userId: number): Promise<EnrichedCartItem[]> {
    const cartItems = await cartRepository.find({
      where: { userId },
      order: { addedAt: "DESC" },
    });

    if (cartItems.length === 0) return [];

    const productIds = cartItems.map((item) => item.productId);
    const products = await productRepository.findByIds(productIds);
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

  async addToCart(
    userId: number,
    productId: string,
    quantity: number = 1
  ): Promise<EnrichedCartItem[]> {
    const product = await productRepository.findOne({
      where: { id: productId, active: 1 },
    });

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    const qty = Math.max(1, Number(quantity) || 1);

    const existingItem = await cartRepository.findOne({
      where: { userId, productId },
    });

    if (existingItem) {
      existingItem.quantity += qty;
      await cartRepository.save(existingItem);
    } else {
      const newItem = cartRepository.create({
        userId,
        productId,
        quantity: qty,
      });
      await cartRepository.save(newItem);
    }

    return await this.getCart(userId);
  }

  async updateQuantity(
    userId: number,
    productId: string,
    quantity: number
  ): Promise<EnrichedCartItem[]> {
    const qty = Number(quantity);
    if (!qty || qty < 1) {
      return await this.removeFromCart(userId, productId);
    }

    const existingItem = await cartRepository.findOne({
      where: { userId, productId },
    });

    if (!existingItem) {
      return await this.addToCart(userId, productId, qty);
    }

    existingItem.quantity = qty;
    await cartRepository.save(existingItem);

    return await this.getCart(userId);
  }

  async removeFromCart(
    userId: number,
    productId: string
  ): Promise<EnrichedCartItem[]> {
    await cartRepository.delete({ userId, productId });
    return await this.getCart(userId);
  }

  async clearCart(userId: number): Promise<EnrichedCartItem[]> {
    await cartRepository.delete({ userId });
    return [];
  }
}

export default new CartService();
