import { Request, Response } from "express";
import productService from "../services/product.service";
import { sendSuccess, sendError } from "../helpers/response.helper";
import { messages } from "../helpers/message.helper";

export class ProductController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const category = req.query.category as string | undefined;
      const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
      const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
      const search = req.query.q as string | undefined;

      const products = await productService.getProducts({
        category,
        minPrice,
        maxPrice,
        search,
      });

      sendSuccess(res, 200, messages.product.retrieved, products);
    } catch (error) {
      console.error("Get products error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const product = await productService.getProductById(String(req.params.id));
      sendSuccess(res, 200, messages.product.retrievedOne, product);
    } catch (error: any) {
      if (error?.message === "PRODUCT_NOT_FOUND") {
        sendError(res, 404, messages.product.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async search(req: Request, res: Response): Promise<void> {
    try {
      const q = String(req.query.q || "").trim();
      const cat = String(req.query.category || "").trim();
      const products = await productService.searchProducts(q, cat);
      sendSuccess(res, 200, messages.product.retrieved, products);
    } catch (error) {
      console.error("Search products error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const product = await productService.createProduct(req.body);
      sendSuccess(res, 201, messages.product.created, product);
    } catch (error) {
      console.error("Create product error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const product = await productService.updateProduct(String(req.params.id), req.body);
      sendSuccess(res, 200, messages.product.updated, product);
    } catch (error: any) {
      if (error?.message === "PRODUCT_NOT_FOUND") {
        sendError(res, 404, messages.product.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      await productService.deleteProduct(String(req.params.id));
      sendSuccess(res, 200, messages.product.deleted);
    } catch (error: any) {
      if (error?.message === "PRODUCT_NOT_FOUND") {
        sendError(res, 404, messages.product.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }
}

export default new ProductController();
