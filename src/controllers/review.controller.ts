import { Request, Response } from "express";
import reviewService from "../services/review.service";
import { sendSuccess, sendError } from "../helpers/response.helper";
import { messages } from "../helpers/message.helper";

export class ReviewController {
  async getProductReviews(req: Request, res: Response): Promise<void> {
    try {
      const productId = String(req.params.id || req.params.productId);
      const reviews = await reviewService.getProductReviews(productId);
      sendSuccess(res, 200, messages.review.retrieved, reviews);
    } catch (error) {
      console.error("Get product reviews error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async submitReview(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const { productId, rating, title, body } = req.body || {};
      const review = await reviewService.addReview(
        String(productId),
        userId,
        Number(rating),
        title,
        body
      );
      sendSuccess(res, 201, messages.review.created, review);
    } catch (error: any) {
      if (error?.message === "PRODUCT_NOT_FOUND") {
        sendError(res, 404, messages.product.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async getAllReviews(_req: Request, res: Response): Promise<void> {
    try {
      const reviews = await reviewService.getAllReviews();
      sendSuccess(res, 200, messages.review.retrieved, reviews);
    } catch (error) {
      console.error("Get all reviews error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async deleteReview(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.id;
      const role = String(req.user?.role || "");
      await reviewService.deleteReview(Number(req.params.id), userId, role);
      sendSuccess(res, 200, messages.review.deleted);
    } catch (error: any) {
      if (error?.message === "REVIEW_NOT_FOUND") {
        sendError(res, 404, messages.review.notFound);
        return;
      }
      if (error?.message === "FORBIDDEN") {
        sendError(res, 403, messages.common.forbidden);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }
}

export default new ReviewController();
