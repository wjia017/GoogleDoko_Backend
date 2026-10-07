import { Router } from "express";
import productController from "../controllers/product.controller";
import reviewController from "../controllers/review.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validation.middleware";
import {
  createProductValidator,
  updateProductValidator,
} from "../validations/product.validator";

const router = Router();

router.get("/", productController.getAll);
router.get("/search", productController.search);
router.get("/:id", productController.getOne);
router.get("/:id/reviews", reviewController.getProductReviews);

router.post(
  "/",
  authenticate,
  createProductValidator,
  validateRequest,
  productController.create
);

router.put(
  "/:id",
  authenticate,
  updateProductValidator,
  validateRequest,
  productController.update
);

router.delete("/:id", authenticate, productController.delete);

export default router;
