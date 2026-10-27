"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const address_service_1 = __importDefault(require("../services/address.service"));
const response_helper_1 = require("../helpers/response.helper");
const message_helper_1 = require("../helpers/message.helper");
class AddressController {
    async create(req, res) {
        try {
            const userId = req.user.id;
            await address_service_1.default.createAddress(userId, req.body);
            const addresses = await address_service_1.default.getUserAddresses(userId);
            (0, response_helper_1.sendSuccess)(res, 201, message_helper_1.messages.address.created, addresses);
        }
        catch (error) {
            console.error("Create address error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async getAll(req, res) {
        try {
            const userId = req.user.id;
            const addresses = await address_service_1.default.getUserAddresses(userId);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.address.retrieved, addresses);
        }
        catch (error) {
            console.error("Get addresses error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async getOne(req, res) {
        try {
            const userId = req.user.id;
            const addressId = Number(req.params.id);
            const address = await address_service_1.default.getAddressById(userId, addressId);
            if (!address) {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.address.notFound);
                return;
            }
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.address.retrievedOne, address);
        }
        catch (error) {
            console.error("Get address error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async update(req, res) {
        try {
            const userId = req.user.id;
            const addressId = Number(req.params.id);
            await address_service_1.default.updateAddress(userId, addressId, req.body);
            const addresses = await address_service_1.default.getUserAddresses(userId);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.address.updated, addresses);
        }
        catch (error) {
            if (error?.message === "ADDRESS_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.address.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async setDefault(req, res) {
        try {
            const userId = req.user.id;
            const addressId = Number(req.params.id);
            await address_service_1.default.setDefaultAddress(userId, addressId);
            const addresses = await address_service_1.default.getUserAddresses(userId);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.address.defaultUpdated, addresses);
        }
        catch (error) {
            if (error?.message === "ADDRESS_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.address.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async delete(req, res) {
        try {
            const userId = req.user.id;
            const addressId = Number(req.params.id);
            await address_service_1.default.deleteAddress(userId, addressId);
            const addresses = await address_service_1.default.getUserAddresses(userId);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.address.deleted, addresses);
        }
        catch (error) {
            if (error?.message === "ADDRESS_NOT_FOUND") {
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.address.notFound);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
}
exports.AddressController = AddressController;
exports.default = new AddressController();
