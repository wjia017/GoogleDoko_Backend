import { Router } from "express";
import wishlistController from "../controllers/wishlist.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.get("/", wishlistController.getWishlist);
router.post("/:productId", wishlistController.addToWishlist);
router.delete("/:productId", wishlistController.removeFromWishlist);
router.patch("/:productId/toggle", wishlistController.toggleWishlist);

export default router;
