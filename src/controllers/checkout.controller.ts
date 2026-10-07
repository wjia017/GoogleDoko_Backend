import { Request, Response } from "express";
import checkoutService from "../services/checkout.service";
import { sendSuccess, sendError } from "../helpers/response.helper";
import { messages } from "../helpers/message.helper";

export class CheckoutController {
  async getSettings(_req: Request, res: Response): Promise<void> {
    try {
      const settings = await checkoutService.getSettings();
      sendSuccess(res, 200, messages.checkout.settingsRetrieved, settings);
    } catch (error) {
      console.error("Get settings error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async validateCoupon(req: Request, res: Response): Promise<void> {
    try {
      const { code, subtotal = 0 } = req.body || {};
      const result = await checkoutService.validateCoupon(code, subtotal);
      if (!result.valid) {
        sendError(res, 400, result.error || messages.checkout.couponInvalid, { valid: false });
        return;
      }
      sendSuccess(res, 200, messages.checkout.couponValid, result);
    } catch (error) {
      console.error("Validate coupon error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async calculateCheckout(req: Request, res: Response): Promise<void> {
    try {
      const { items = [], couponCode } = req.body || {};
      const summary = await checkoutService.calculateCheckout(items, couponCode);
      sendSuccess(res, 200, messages.checkout.calculated, summary);
    } catch (error) {
      console.error("Calculate checkout error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }
}

export default new CheckoutController();
