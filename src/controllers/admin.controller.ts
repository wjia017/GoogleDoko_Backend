import { Request, Response } from "express";
import adminService from "../services/admin.service";
import { sendSuccess, sendError } from "../helpers/response.helper";
import { messages } from "../helpers/message.helper";

export class AdminController {
  async getOverview(_req: Request, res: Response): Promise<void> {
    try {
      const overview = await adminService.getOverview();
      sendSuccess(res, 200, messages.admin.overviewRetrieved, overview);
    } catch (error) {
      console.error("Get overview error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async getUsers(_req: Request, res: Response): Promise<void> {
    try {
      const users = await adminService.getUsers();
      sendSuccess(res, 200, messages.admin.usersRetrieved, users);
    } catch (error) {
      console.error("Get users error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async getVendors(_req: Request, res: Response): Promise<void> {
    try {
      const vendors = await adminService.getVendors();
      sendSuccess(res, 200, messages.admin.vendorsRetrieved, vendors);
    } catch (error) {
      console.error("Get vendors error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async updateVendorStatus(req: Request, res: Response): Promise<void> {
    try {
      const userId = Number(req.params.userId);
      const result = await adminService.updateVendorStatus(userId, req.body.status);
      sendSuccess(res, 200, messages.vendor.statusUpdated, result);
    } catch (error: any) {
      if (error?.message === "VENDOR_NOT_FOUND") {
        sendError(res, 404, messages.vendor.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async getCoupons(_req: Request, res: Response): Promise<void> {
    try {
      const coupons = await adminService.getCoupons();
      sendSuccess(res, 200, messages.coupon.retrieved, coupons);
    } catch (error) {
      console.error("Get coupons error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async createCoupon(req: Request, res: Response): Promise<void> {
    try {
      const coupon = await adminService.createCoupon(req.body);
      sendSuccess(res, 201, messages.coupon.created, coupon);
    } catch (error: any) {
      if (error?.message === "COUPON_ALREADY_EXISTS") {
        sendError(res, 409, messages.coupon.alreadyExists);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async toggleCoupon(req: Request, res: Response): Promise<void> {
    try {
      const coupon = await adminService.toggleCoupon(Number(req.params.id));
      sendSuccess(res, 200, messages.coupon.toggled, coupon);
    } catch (error: any) {
      if (error?.message === "COUPON_NOT_FOUND") {
        sendError(res, 404, messages.coupon.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async deleteCoupon(req: Request, res: Response): Promise<void> {
    try {
      await adminService.deleteCoupon(Number(req.params.id));
      sendSuccess(res, 200, messages.coupon.deleted);
    } catch (error: any) {
      if (error?.message === "COUPON_NOT_FOUND") {
        sendError(res, 404, messages.coupon.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async getSettings(_req: Request, res: Response): Promise<void> {
    try {
      const settings = await adminService.getSettings();
      sendSuccess(res, 200, messages.admin.settingsRetrieved, settings);
    } catch (error) {
      console.error("Get settings error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async updateSettings(req: Request, res: Response): Promise<void> {
    try {
      const settings = await adminService.updateSettings(req.body || {});
      sendSuccess(res, 200, messages.admin.settingsUpdated, settings);
    } catch (error) {
      console.error("Update settings error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async getProducts(_req: Request, res: Response): Promise<void> {
    try {
      const products = await adminService.getAllProducts();
      sendSuccess(res, 200, messages.product.retrieved, products);
    } catch (error) {
      console.error("Get products error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async saveProduct(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id ? String(req.params.id) : undefined;
      const product = await adminService.saveProduct(id, req.body);
      sendSuccess(res, 200, messages.product.updated, product);
    } catch (error: any) {
      if (error?.message === "PRODUCT_NOT_FOUND") {
        sendError(res, 404, messages.product.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      await adminService.deleteProduct(String(req.params.id));
      sendSuccess(res, 200, messages.product.deleted);
    } catch (error: any) {
      if (error?.message === "PRODUCT_NOT_FOUND") {
        sendError(res, 404, messages.product.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async getOrders(_req: Request, res: Response): Promise<void> {
    try {
      const orders = await adminService.getAllOrders();
      sendSuccess(res, 200, messages.admin.ordersRetrieved, orders);
    } catch (error) {
      console.error("Get orders error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async updateOrderStatus(req: Request, res: Response): Promise<void> {
    try {
      const order = await adminService.updateOrderStatus(
        String(req.params.id),
        req.body.status,
        req.body.paymentStatus
      );
      sendSuccess(res, 200, messages.order.statusUpdated, order);
    } catch (error: any) {
      if (error?.message === "ORDER_NOT_FOUND") {
        sendError(res, 404, messages.order.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async getSupportMessages(_req: Request, res: Response): Promise<void> {
    try {
      const messagesList = await adminService.getSupportMessages();
      sendSuccess(res, 200, messages.support.inquiriesRetrieved, messagesList);
    } catch (error) {
      console.error("Get support error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async updateSupportStatus(req: Request, res: Response): Promise<void> {
    try {
      const msg = await adminService.updateSupportStatus(
        Number(req.params.id),
        req.body.status || "Resolved"
      );
      sendSuccess(res, 200, messages.support.statusUpdated, msg);
    } catch (error: any) {
      if (error?.message === "RESOURCE_NOT_FOUND") {
        sendError(res, 404, messages.common.resourceNotFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async getSubscribers(_req: Request, res: Response): Promise<void> {
    try {
      const subs = await adminService.getSubscribers();
      sendSuccess(res, 200, messages.support.subscribersRetrieved, subs);
    } catch (error) {
      console.error("Get subscribers error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }
}

export default new AdminController();
