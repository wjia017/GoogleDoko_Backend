"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const express_validator_1 = require("express-validator");
const response_helper_1 = require("../helpers/response.helper");
const message_helper_1 = require("../helpers/message.helper");
const validateRequest = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const formattedErrors = errors
            .array({ onlyFirstError: true })
            .map((error) => ({
            field: "path" in error
                ? error.path
                : "unknown",
            message: error.msg,
        }));
        (0, response_helper_1.sendError)(res, 400, message_helper_1.messages.common.validationFailed, formattedErrors);
        return;
    }
    next();
};
exports.validateRequest = validateRequest;
