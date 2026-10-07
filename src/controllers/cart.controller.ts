import { Request, Response } from "express";
import cartService from "../services/cart.service";
import { sendSuccess, sendError } from "../helpers/response.helper";
import { messages } from "../helpers/message.helper";

export class CartController {
  async getCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const items = await cartService.getCart(userId);
      sendSuccess(res, 200, messages.cart.retrieved, items);
    } catch (error) {
      console.error("Get cart error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async addToCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { productId, quantity = 1 } = req.body || {};
      const items = await cartService.addToCart(userId, String(productId), quantity);
      sendSuccess(res, 200, messages.cart.itemAdded, items);
    } catch (error: any) {
      if (error?.message === "PRODUCT_NOT_FOUND") {
        sendError(res, 404, messages.product.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async updateQuantity(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { quantity } = req.body || {};
      const items = await cartService.updateQuantity(
        userId,
        String(req.params.productId),
        quantity
      );
      sendSuccess(res, 200, messages.cart.quantityUpdated, items);
    } catch (error) {
      console.error("Update quantity error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async removeItem(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const items = await cartService.removeFromCart(
        userId,
        String(req.params.productId)
      );
      sendSuccess(res, 200, messages.cart.itemRemoved, items);
    } catch (error) {
      console.error("Remove cart item error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async clearCart(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const items = await cartService.clearCart(userId);
      sendSuccess(res, 200, messages.cart.cleared, items);
    } catch (error) {
      console.error("Clear cart error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }
}

export default new CartController();
