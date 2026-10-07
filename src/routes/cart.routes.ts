import { Router } from "express";
import cartController from "../controllers/cart.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validation.middleware";
import {
  addToCartValidator,
  updateCartQuantityValidator,
} from "../validations/cart.validator";

const router = Router();

router.use(authenticate);

router.get("/", cartController.getCart);

router.post(
  "/",
  addToCartValidator,
  validateRequest,
  cartController.addToCart
);

router.put(
  "/:productId",
  updateCartQuantityValidator,
  validateRequest,
  cartController.updateQuantity
);

router.delete("/:productId", cartController.removeItem);

router.delete("/", cartController.clearCart);

export default router;
