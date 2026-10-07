"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardsController = void 0;
const rewards_service_1 = __importDefault(require("../services/rewards.service"));
const response_helper_1 = require("../helpers/response.helper");
const message_helper_1 = require("../helpers/message.helper");
class RewardsController {
    async getRewards(req, res) {
        try {
            const userId = req.user.id;
            const rewards = await rewards_service_1.default.getRewards(userId);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.rewards.retrieved, rewards);
        }
        catch (error) {
            console.error("Get rewards error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
    async redeemPoints(req, res) {
        try {
            const userId = req.user.id;
            const amount = Number(req.body?.amount || req.body?.points || 0);
            const result = await rewards_service_1.default.redeemPoints(userId, amount);
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.rewards.redeemed, result);
        }
        catch (error) {
            if (error?.message === "INSUFFICIENT_POINTS") {
                (0, response_helper_1.sendError)(res, 400, message_helper_1.messages.rewards.insufficientPoints);
                return;
            }
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
}
exports.RewardsController = RewardsController;
exports.default = new RewardsController();
