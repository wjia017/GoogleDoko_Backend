import { Request, Response } from "express";
import wishlistService from "../services/wishlist.service";
import { sendSuccess, sendError } from "../helpers/response.helper";
import { messages } from "../helpers/message.helper";

export class WishlistController {
  async getWishlist(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const items = await wishlistService.getWishlist(userId);
      sendSuccess(res, 200, messages.wishlist.retrieved, items);
    } catch (error) {
      console.error("Get wishlist error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async addToWishlist(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const productId = String(req.params.productId);
      const items = await wishlistService.addToWishlist(userId, productId);
      sendSuccess(res, 200, messages.wishlist.itemAdded, items);
    } catch (error: any) {
      if (error?.message === "PRODUCT_NOT_FOUND") {
        sendError(res, 404, messages.product.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async removeFromWishlist(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const productId = String(req.params.productId);
      const items = await wishlistService.removeFromWishlist(userId, productId);
      sendSuccess(res, 200, messages.wishlist.itemRemoved, items);
    } catch (error) {
      console.error("Remove from wishlist error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async toggleWishlist(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const productId = String(req.params.productId);
      const result = await wishlistService.toggleWishlist(userId, productId);
      sendSuccess(res, 200, messages.wishlist.toggled, result);
    } catch (error: any) {
      if (error?.message === "PRODUCT_NOT_FOUND") {
        sendError(res, 404, messages.product.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }
}

export default new WishlistController();
