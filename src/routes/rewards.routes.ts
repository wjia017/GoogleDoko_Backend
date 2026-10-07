import { Router } from "express";
import rewardsController from "../controllers/rewards.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validation.middleware";
import { redeemPointsValidator } from "../validations/rewards.validator";

const router = Router();

router.use(authenticate);

router.get("/", rewardsController.getRewards);

router.post(
  "/redeem",
  redeemPointsValidator,
  validateRequest,
  rewardsController.redeemPoints
);

export default router;
