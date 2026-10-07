"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, statusCode, message, data) => {
    return res.status(statusCode).json({
        success: true,
        message,
        ...(data !== undefined ? { data } : {}),
    });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, statusCode, message, errors) => {
    return res.status(statusCode).json({
        success: false,
        message,
        ...(errors !== undefined ? { errors } : {}),
    });
};
exports.sendError = sendError;
