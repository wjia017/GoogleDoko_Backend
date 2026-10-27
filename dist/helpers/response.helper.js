"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendError = exports.sendSuccess = void 0;
const sendSuccess = (res, statusCode, message, data) => {
    const isPlainObj = data !== undefined &&
        typeof data === "object" &&
        data !== null &&
        !Array.isArray(data);
    return res.status(statusCode).json({
        ok: true,
        success: true,
        message,
        ...(data !== undefined ? { data } : {}),
        ...(isPlainObj ? data : {}),
    });
};
exports.sendSuccess = sendSuccess;
const sendError = (res, statusCode, message, errors) => {
    return res.status(statusCode).json({
        ok: false,
        success: false,
        message,
        error: message,
        ...(errors !== undefined ? { errors } : {}),
    });
};
exports.sendError = sendError;
