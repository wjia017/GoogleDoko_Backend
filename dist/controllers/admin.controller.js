"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = __importDefault(require("../services/admin.service"));
const response_helper_1 = require("../helpers/response.helper");
const message_helper_1 = require("../helpers/message.helper");
class AdminController {
    async getOverview(_req, res) {
        try {
            const overview = await admin_service_1.default.getOverview();
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.admin.overviewRetrieved, overview);
        }
        catch (error) {
            console.error("Get overview error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async getUsers(_req, res) {
        try {
            const users = await admin_service_1.default.getUsers();
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.admin.usersRetrieved, users);
        }
        catch (error) {
            console.error("Get users error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async getVendors(_req, res) {
        try {
            const vendors = await admin_service_1.default.getVendors();
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.admin.vendorsRetrieved, vendors);
        }
        catch (error) {
            console.error("Get vendors error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async updateVendorStatus(req, res) {
        try {
            const userId = Number(req.params.userId);
            const result = await admin_service_1.default.updateVendorStatus(userId, req.body.status);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.vendor.statusUpdated, result);
        }
        catch (error) {
            if (error?.message === "VENDOR_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.vendor.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async getCoupons(_req, res) {
        try {
            const coupons = await admin_service_1.default.getCoupons();
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.coupon.retrieved, coupons);
        }
        catch (error) {
            console.error("Get coupons error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async createCoupon(req, res) {
        try {
            const coupon = await admin_service_1.default.createCoupon(req.body);
            (0, response_helper_1.sendSuccess)(res, 201, message_helper_1.messages.coupon.created, coupon);
        }
        catch (error) {
            if (error?.message === "COUPON_ALREADY_EXISTS") {
                (0, response_helper_1.sendError)(res, 409, message_helper_1.messages.coupon.alreadyExists);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async toggleCoupon(req, res) {
        try {
            const coupon = await admin_service_1.default.toggleCoupon(Number(req.params.id));
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.coupon.toggled, coupon);
        }
        catch (error) {
            if (error?.message === "COUPON_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.coupon.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async deleteCoupon(req, res) {
        try {
            await admin_service_1.default.deleteCoupon(Number(req.params.id));
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.coupon.deleted);
        }
        catch (error) {
            if (error?.message === "COUPON_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.coupon.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async getSettings(_req, res) {
        try {
            const settings = await admin_service_1.default.getSettings();
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.admin.settingsRetrieved, settings);
        }
        catch (error) {
            console.error("Get settings error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async updateSettings(req, res) {
        try {
            const settings = await admin_service_1.default.updateSettings(req.body || {});
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.admin.settingsUpdated, settings);
        }
        catch (error) {
            console.error("Update settings error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async getProducts(_req, res) {
        try {
            const products = await admin_service_1.default.getAllProducts();
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.product.retrieved, products);
        }
        catch (error) {
            console.error("Get products error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async saveProduct(req, res) {
        try {
            const id = req.params.id ? String(req.params.id) : undefined;
            const product = await admin_service_1.default.saveProduct(id, req.body);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.product.updated, product);
        }
        catch (error) {
            if (error?.message === "PRODUCT_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.product.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async deleteProduct(req, res) {
        try {
            await admin_service_1.default.deleteProduct(String(req.params.id));
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.product.deleted);
        }
        catch (error) {
            if (error?.message === "PRODUCT_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.product.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async getOrders(_req, res) {
        try {
            const orders = await admin_service_1.default.getAllOrders();
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.admin.ordersRetrieved, orders);
        }
        catch (error) {
            console.error("Get orders error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async updateOrderStatus(req, res) {
        try {
            const order = await admin_service_1.default.updateOrderStatus(String(req.params.id), req.body.status, req.body.paymentStatus);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.order.statusUpdated, order);
        }
        catch (error) {
            if (error?.message === "ORDER_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.order.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async getSupportMessages(_req, res) {
        try {
            const messagesList = await admin_service_1.default.getSupportMessages();
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.support.inquiriesRetrieved, messagesList);
        }
        catch (error) {
            console.error("Get support error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async updateSupportStatus(req, res) {
        try {
            const msg = await admin_service_1.default.updateSupportStatus(Number(req.params.id), req.body.status || "Resolved");
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.support.statusUpdated, msg);
        }
        catch (error) {
            if (error?.message === "RESOURCE_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.common.resourceNotFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async getSubscribers(_req, res) {
        try {
            const subs = await admin_service_1.default.getSubscribers();
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.support.subscribersRetrieved, subs);
        }
        catch (error) {
            console.error("Get subscribers error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
}
exports.AdminController = AdminController;
exports.default = new AdminController();
