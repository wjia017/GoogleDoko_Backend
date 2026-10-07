import { Request, Response } from "express";
import addressService from "../services/address.service";
import { sendSuccess, sendError } from "../helpers/response.helper";
import { messages } from "../helpers/message.helper";

export class AddressController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const address = await addressService.createAddress(userId, req.body);
      sendSuccess(res, 201, messages.address.created, { address });
    } catch (error) {
      console.error("Create address error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const addresses = await addressService.getUserAddresses(userId);
      sendSuccess(res, 200, messages.address.retrieved, { addresses });
    } catch (error) {
      console.error("Get addresses error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const addressId = Number(req.params.id);
      const address = await addressService.getAddressById(userId, addressId);

      if (!address) {
        sendError(res, 404, messages.address.notFound);
        return;
      }

      sendSuccess(res, 200, messages.address.retrievedOne, { address });
    } catch (error) {
      console.error("Get address error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const addressId = Number(req.params.id);
      const address = await addressService.updateAddress(userId, addressId, req.body);
      sendSuccess(res, 200, messages.address.updated, { address });
    } catch (error: any) {
      if (error?.message === "ADDRESS_NOT_FOUND") {
        sendError(res, 404, messages.address.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async setDefault(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const addressId = Number(req.params.id);
      const address = await addressService.setDefaultAddress(userId, addressId);
      sendSuccess(res, 200, messages.address.defaultUpdated, { address });
    } catch (error: any) {
      if (error?.message === "ADDRESS_NOT_FOUND") {
        sendError(res, 404, messages.address.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const addressId = Number(req.params.id);
      await addressService.deleteAddress(userId, addressId);
      sendSuccess(res, 200, messages.address.deleted);
    } catch (error: any) {
      if (error?.message === "ADDRESS_NOT_FOUND") {
        sendError(res, 404, messages.address.notFound);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }
}

export default new AddressController();
