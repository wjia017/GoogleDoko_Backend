"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RewardsService = void 0;
const repository_1 = require("../repository");
class RewardsService {
    async getRewards(userId) {
        const user = await repository_1.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }
        const logs = await repository_1.rewardLogRepository.find({
            where: { userId },
            order: { createdAt: "DESC" },
            take: 50,
        });
        const mappedLog = logs.map((r) => ({
            id: String(r.id),
            label: r.label,
            points: r.points,
            date: new Date(r.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
            }),
        }));
        return {
            points: user.rewardPoints || 0,
            referralCode: user.referralCode || "",
            log: mappedLog,
        };
    }
    async redeemPoints(userId, amount) {
        const numAmount = Number(amount);
        if (!numAmount || numAmount < 1) {
            throw new Error("VALIDATION_FAILED");
        }
        const user = await repository_1.userRepository.findOne({
            where: { id: userId },
        });
        if (!user) {
            throw new Error("USER_NOT_FOUND");
        }
        if ((user.rewardPoints || 0) < numAmount) {
            throw new Error("INSUFFICIENT_POINTS");
        }
        user.rewardPoints -= numAmount;
        await repository_1.userRepository.save(user);
        const logEntry = repository_1.rewardLogRepository.create({
            userId,
            label: "Redeemed Points",
            points: -numAmount,
        });
        await repository_1.rewardLogRepository.save(logEntry);
        const summary = await this.getRewards(userId);
        return {
            points: summary.points,
            log: summary.log,
        };
    }
}
exports.RewardsService = RewardsService;
exports.default = new RewardsService();
