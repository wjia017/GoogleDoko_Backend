import { Request, Response } from "express";
import rewardsService from "../services/rewards.service";
import { sendSuccess, sendError } from "../helpers/response.helper";
import { messages } from "../helpers/message.helper";

export class RewardsController {
  async getRewards(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const rewards = await rewardsService.getRewards(userId);
      sendSuccess(res, 200, messages.rewards.retrieved, rewards);
    } catch (error) {
      console.error("Get rewards error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }

  async redeemPoints(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user!.id;
      const amount = Number(req.body?.amount || req.body?.points || 0);
      const result = await rewardsService.redeemPoints(userId, amount);
      sendSuccess(res, 200, messages.rewards.redeemed, result);
    } catch (error: any) {
      if (error?.message === "INSUFFICIENT_POINTS") {
        sendError(res, 400, messages.rewards.insufficientPoints);
        return;
      }
      sendError(res, 500, messages.common.internalServerError);
    }
  }
}

export default new RewardsController();
