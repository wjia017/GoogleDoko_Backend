"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_controller_1 = __importDefault(require("../controllers/cart.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const cart_validator_1 = require("../validations/cart.validator");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get("/", cart_controller_1.default.getCart);
router.post("/", cart_validator_1.addToCartValidator, validation_middleware_1.validateRequest, cart_controller_1.default.addToCart);
router.put("/:productId", cart_validator_1.updateCartQuantityValidator, validation_middleware_1.validateRequest, cart_controller_1.default.updateQuantity);
router.delete("/:productId", cart_controller_1.default.removeItem);
router.delete("/", cart_controller_1.default.clearCart);
exports.default = router;
