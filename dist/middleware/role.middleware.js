"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vendorOnly = exports.adminOnly = exports.authorize = void 0;
const user_entity_1 = require("../entities/user.entity");
const response_helper_1 = require("../helpers/response.helper");
const message_helper_1 = require("../helpers/message.helper");
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            (0, response_helper_1.sendError)(res, 401, message_helper_1.messages.auth.authenticationRequired);
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            (0, response_helper_1.sendError)(res, 403, message_helper_1.messages.common.forbidden);
            return;
        }
        next();
    };
};
exports.authorize = authorize;
exports.adminOnly = (0, exports.authorize)(user_entity_1.UserRole.ADMIN, "admin");
exports.vendorOnly = (0, exports.authorize)(user_entity_1.UserRole.VENDOR, "vendor");
exports.default = exports.authorize;
