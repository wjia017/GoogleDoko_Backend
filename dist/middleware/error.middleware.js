"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const response_helper_1 = require("../helpers/response.helper");
const message_helper_1 = require("../helpers/message.helper");
const errorHandler = (err, _req, res, _next) => {
    console.error(err);
    if (err instanceof Error) {
        switch (err.message) {
            case "ACCOUNT_ALREADY_EXISTS":
                (0, response_helper_1.sendError)(res, 409, message_helper_1.messages.auth.accountAlreadyExists);
                return;
            case "INVALID_CREDENTIALS":
                (0, response_helper_1.sendError)(res, 401, message_helper_1.messages.auth.invalidCredentials);
                return;
            case "USER_NOT_FOUND":
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.auth.userNotFound);
                return;
            case "AUTHENTICATION_REQUIRED":
                (0, response_helper_1.sendError)(res, 401, message_helper_1.messages.auth.authenticationRequired);
                return;
            case "ADDRESS_NOT_FOUND":
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.address.notFound);
                return;
            case "PRODUCT_NOT_FOUND":
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.product.notFound);
                return;
            case "ORDER_NOT_FOUND":
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.order.notFound);
                return;
            case "COUPON_NOT_FOUND":
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.coupon.notFound);
                return;
            case "COUPON_ALREADY_EXISTS":
                (0, response_helper_1.sendError)(res, 409, message_helper_1.messages.coupon.alreadyExists);
                return;
            case "REVIEW_NOT_FOUND":
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.review.notFound);
                return;
            case "VENDOR_NOT_FOUND":
                (0, response_helper_1.sendError)(res, 404, message_helper_1.messages.vendor.notFound);
                return;
            case "FORBIDDEN":
                (0, response_helper_1.sendError)(res, 403, message_helper_1.messages.common.forbidden);
                return;
            case "INSUFFICIENT_POINTS":
                (0, response_helper_1.sendError)(res, 400, message_helper_1.messages.rewards.insufficientPoints);
                return;
            case "INSUFFICIENT_STOCK":
                (0, response_helper_1.sendError)(res, 400, message_helper_1.messages.order.insufficientStock);
                return;
            case "INVALID_RESET_TOKEN":
                (0, response_helper_1.sendError)(res, 400, message_helper_1.messages.auth.invalidResetToken);
                return;
            case "CURRENT_PASSWORD_INCORRECT":
                (0, response_helper_1.sendError)(res, 400, message_helper_1.messages.auth.currentPasswordIncorrect);
                return;
        }
    }
    (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
};
exports.errorHandler = errorHandler;
