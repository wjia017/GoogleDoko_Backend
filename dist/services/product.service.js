"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const repository_1 = require("../repository");
class ProductService {
    async getProducts(filters) {
        const qb = repository_1.productRepository.createQueryBuilder("product");
        qb.where("product.active = 1");
        if (filters?.category && filters.category !== "all" && filters.category !== "All") {
            qb.andWhere("LOWER(product.category) = LOWER(:category)", {
                category: filters.category,
            });
        }
        if (filters?.search) {
            qb.andWhere("(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.category) LIKE LOWER(:search) OR LOWER(product.origin) LIKE LOWER(:search))", { search: `%${filters.search}%` });
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
    async getProductById(id) {
        const product = await repository_1.productRepository.findOne({
            where: { id },
        });
        if (!product) {
            throw new Error("PRODUCT_NOT_FOUND");
        }
        return product;
    }
    async searchProducts(query, category) {
        return this.getProducts({
            search: query,
            category,
        });
    }
    async createProduct(data) {
        const id = data.id || `PROD-${Date.now()}`;
        const product = repository_1.productRepository.create({
            ...data,
            id,
            stock: data.stock ?? 100,
            active: data.active ?? 1,
            rating: data.rating ?? 4.8,
            sold: data.sold ?? "0",
            origin: data.origin || "Nepal",
            seller: data.seller || "GoogleDoko Store",
        });
        return await repository_1.productRepository.save(product);
    }
    async updateProduct(id, data) {
        const product = await repository_1.productRepository.findOne({
            where: { id },
        });
        if (!product) {
            throw new Error("PRODUCT_NOT_FOUND");
        }
        Object.assign(product, data);
        return await repository_1.productRepository.save(product);
    }
    async deleteProduct(id) {
        const product = await repository_1.productRepository.findOne({
            where: { id },
        });
        if (!product) {
            throw new Error("PRODUCT_NOT_FOUND");
        }
        await repository_1.productRepository.remove(product);
    }
}
exports.ProductService = ProductService;
exports.default = new ProductService();
