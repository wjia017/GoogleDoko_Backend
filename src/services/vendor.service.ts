import crypto from "crypto";

import {
  productRepository,
  vendorRepository,
} from "../repository";

import { Product } from "../entities/product.entity";

export class VendorService {
  async getVendorProducts(userId: number): Promise<Product[]> {
    return await productRepository.find({
      where: { vendorUserId: userId, active: 1 },
      order: { createdAt: "DESC" },
    });
  }

  async saveVendorProduct(
    userId: number,
    body: any,
    paramId?: string,
    vendorName?: string,
    vendorLocation?: string
  ): Promise<{ id: string }> {
    const id = paramId || `PROD-${crypto.randomUUID()}`;
    const current = await productRepository.findOne({
      where: { id },
    });

    if (paramId && !current) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    if (current && current.vendorUserId !== userId) {
      throw new Error("FORBIDDEN");
    }

    const vendor = await vendorRepository.findOne({
      where: { userId },
    });

    const seller = vendorName || vendor?.businessName || "GoogleDoko Vendor";
    const origin = vendorLocation || vendor?.location || "Nepal";

    if (current) {
      current.name = body.name ?? current.name;
      current.category = body.category ?? current.category;
      current.weight = body.weight ?? current.weight;
      current.price = Number(body.price ?? current.price);
      current.stock = Number(body.stock ?? current.stock);
      current.active = body.active !== undefined ? (body.active ? 1 : 0) : current.active;
      current.image = body.image ?? current.image;
      current.description = body.description ?? current.description;
      await productRepository.save(current);
    } else {
      const newProduct = productRepository.create({
        id,
        vendorUserId: userId,
        name: body.name,
        category: body.category,
        weight: body.weight,
        price: Number(body.price),
        stock: Number(body.stock ?? 100),
        active: body.active !== undefined ? (body.active ? 1 : 0) : 1,
        image: body.image || "/src/frontend/assets/images/organic-vegetables.jpg",
        seller,
        origin,
        description: body.description || "",
      });
      await productRepository.save(newProduct);
    }

    return { id };
  }

  async deleteVendorProduct(
    userId: number,
    productId: string
  ): Promise<void> {
    const product = await productRepository.findOne({
      where: { id: productId },
    });

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    if (product.vendorUserId !== userId) {
      throw new Error("FORBIDDEN");
    }

    product.active = 0;
    await productRepository.save(product);
  }
}

export default new VendorService();
