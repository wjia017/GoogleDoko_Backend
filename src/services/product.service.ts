import { productRepository } from "../repository";
import { Product } from "../entities/product.entity";

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

export class ProductService {
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    const qb = productRepository.createQueryBuilder("product");

    qb.where("product.active = 1");

    if (filters?.category && filters.category !== "all" && filters.category !== "All") {
      qb.andWhere("LOWER(product.category) = LOWER(:category)", {
        category: filters.category,
      });
    }

    if (filters?.search) {
      qb.andWhere(
        "(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.category) LIKE LOWER(:search) OR LOWER(product.origin) LIKE LOWER(:search))",
        { search: `%${filters.search}%` }
      );
    }

    if (filters?.minPrice !== undefined) {
      qb.andWhere("product.price >= :minPrice", { minPrice: filters.minPrice });
    }

    if (filters?.maxPrice !== undefined) {
      qb.andWhere("product.price <= :maxPrice", { maxPrice: filters.maxPrice });
    }

    qb.orderBy("product.id", "ASC");

    return await qb.getMany();
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    return product;
  }

  async searchProducts(query: string, category?: string): Promise<Product[]> {
    return this.getProducts({
      search: query,
      category,
    });
  }

  async createProduct(data: Partial<Product>): Promise<Product> {
    const id = data.id || `PROD-${Date.now()}`;
    const product = productRepository.create({
      ...data,
      id,
      stock: data.stock ?? 100,
      active: data.active ?? 1,
      rating: data.rating ?? 4.8,
      sold: data.sold ?? "0",
      origin: data.origin || "Nepal",
      seller: data.seller || "GoogleDoko Store",
    });

    return await productRepository.save(product);
  }

  async updateProduct(id: string, data: Partial<Product>): Promise<Product> {
    const product = await productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    Object.assign(product, data);
    return await productRepository.save(product);
  }

  async deleteProduct(id: string): Promise<void> {
    const product = await productRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new Error("PRODUCT_NOT_FOUND");
    }

    await productRepository.remove(product);
  }
}

export default new ProductService();
