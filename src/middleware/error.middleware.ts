import {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  sendError,
} from "../helpers/response.helper";

import {
  messages,
} from "../helpers/message.helper";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err);

  if (err instanceof Error) {
    switch (err.message) {
      case "ACCOUNT_ALREADY_EXISTS":
        sendError(res, 409, messages.auth.accountAlreadyExists);
        return;

      case "INVALID_CREDENTIALS":
        sendError(res, 401, messages.auth.invalidCredentials);
        return;

      case "USER_NOT_FOUND":
        sendError(res, 404, messages.auth.userNotFound);
        return;

      case "AUTHENTICATION_REQUIRED":
        sendError(res, 401, messages.auth.authenticationRequired);
        return;

      case "ADDRESS_NOT_FOUND":
        sendError(res, 404, messages.address.notFound);
        return;

      case "PRODUCT_NOT_FOUND":
        sendError(res, 404, messages.product.notFound);
        return;

      case "ORDER_NOT_FOUND":
        sendError(res, 404, messages.order.notFound);
        return;

      case "COUPON_NOT_FOUND":
        sendError(res, 404, messages.coupon.notFound);
        return;

      case "COUPON_ALREADY_EXISTS":
        sendError(res, 409, messages.coupon.alreadyExists);
        return;

      case "REVIEW_NOT_FOUND":
        sendError(res, 404, messages.review.notFound);
        return;

      case "VENDOR_NOT_FOUND":
        sendError(res, 404, messages.vendor.notFound);
        return;

      case "FORBIDDEN":
        sendError(res, 403, messages.common.forbidden);
        return;

      case "INSUFFICIENT_POINTS":
        sendError(res, 400, messages.rewards.insufficientPoints);
        return;

      case "INSUFFICIENT_STOCK":
        sendError(res, 400, messages.order.insufficientStock);
        return;

      case "INVALID_RESET_TOKEN":
        sendError(res, 400, messages.auth.invalidResetToken);
        return;

      case "CURRENT_PASSWORD_INCORRECT":
        sendError(res, 400, messages.auth.currentPasswordIncorrect);
        return;
    }
  }

  sendError(
    res,
    500,
    messages.common.internalServerError
  );
};
