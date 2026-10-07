"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_controller_1 = __importDefault(require("../controllers/wishlist.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.get("/", wishlist_controller_1.default.getWishlist);
router.post("/:productId", wishlist_controller_1.default.addToWishlist);
router.delete("/:productId", wishlist_controller_1.default.removeFromWishlist);
router.patch("/:productId/toggle", wishlist_controller_1.default.toggleWishlist);
exports.default = router;
