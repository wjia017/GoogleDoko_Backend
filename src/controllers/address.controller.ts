import { Request, Response } from "express";
import addressService from "../services/address.service";
import { sendSuccess, sendError } from "../helpers/response.helper";

class AddressController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;

      const address = await addressService.createAddress(
        userId,
        req.body
      );

      sendSuccess(
        res,
        201,
        "Address added successfully.",
        { address }
      );
    } catch (error) {
      console.error("Create address error:", error);

      sendError(
        res,
        500,
        "Unable to add address. Please try again."
      );
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;

      const addresses =
        await addressService.getUserAddresses(userId);

      sendSuccess(
        res,
        200,
        "Addresses retrieved successfully.",
        { addresses }
      );
    } catch (error) {
      console.error("Get addresses error:", error);

      sendError(
        res,
        500,
        "Unable to retrieve addresses."
      );
    }
  }

  async getOne(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const addressId = Number(req.params.id);

      const address =
        await addressService.getAddressById(
          userId,
          addressId
        );

      if (!address) {
        sendError(res, 404, "Address not found.");
        return;
      }

      sendSuccess(
        res,
        200,
        "Address retrieved successfully.",
        { address }
      );
    } catch (error) {
      console.error("Get address error:", error);

      sendError(
        res,
        500,
        "Unable to retrieve address."
      );
    }
  }

  async setDefault(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const addressId = Number(req.params.id);

      const address =
        await addressService.setDefaultAddress(
          userId,
          addressId
        );

      sendSuccess(
        res,
        200,
        "Default address updated successfully.",
        { address }
      );
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "ADDRESS_NOT_FOUND"
      ) {
        sendError(res, 404, "Address not found.");
        return;
      }

      console.error("Set default address error:", error);

      sendError(
        res,
        500,
        "Unable to update default address."
      );
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const addressId = Number(req.params.id);

      await addressService.deleteAddress(
        userId,
        addressId
      );

      sendSuccess(
        res,
        200,
        "Address deleted successfully."
      );
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "ADDRESS_NOT_FOUND"
      ) {
        sendError(res, 404, "Address not found.");
        return;
      }

      console.error("Delete address error:", error);

      sendError(
        res,
        500,
        "Unable to delete address."
      );
    }
  }
}

export default new AddressController();