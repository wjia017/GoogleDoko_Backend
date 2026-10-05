import { Router } from "express";
import authRoutes from "./auth.routes";
import addressRoutes from "./address.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/addresses", addressRoutes);

export default router;