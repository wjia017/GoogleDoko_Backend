import { Router } from "express";
import authRoutes from "./auth.routes";
import addressRoutes from "./address.routes";
import productRoutes from "./product.routes";
import cartRoutes from "./cart.routes";
import wishlistRoutes from "./wishlist.routes";
import orderRoutes from "./order.routes";
import checkoutRoutes from "./checkout.routes";
import reviewRoutes from "./review.routes";
import rewardsRoutes from "./rewards.routes";
import vendorRoutes from "./vendor.routes";
import adminRoutes from "./admin.routes";
import supportRoutes from "./support.routes";
import uploadRoutes from "./upload.routes";
import testRoutes from "./test.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/addresses", addressRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/orders", orderRoutes);
router.use("/checkout", checkoutRoutes);
router.use("/reviews", reviewRoutes);
router.use("/rewards", rewardsRoutes);
router.use("/vendor", vendorRoutes);
router.use("/admin", adminRoutes);
router.use("/support", supportRoutes);
router.use("/upload", uploadRoutes);
router.use("/test", testRoutes);

export default router;
