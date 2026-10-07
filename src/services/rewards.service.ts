import {
  userRepository,
  rewardLogRepository,
} from "../repository";

export interface RewardsSummary {
  points: number;
  referralCode: string;
  log: Array<{ id: string; label: string; points: number; date: string }>;
}

export class RewardsService {
  async getRewards(userId: number): Promise<RewardsSummary> {
    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    const logs = await rewardLogRepository.find({
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

  async redeemPoints(
    userId: number,
    amount: number
  ): Promise<{ points: number; log: any[] }> {
    const numAmount = Number(amount);
    if (!numAmount || numAmount < 1) {
      throw new Error("VALIDATION_FAILED");
    }

    const user = await userRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new Error("USER_NOT_FOUND");
    }

    if ((user.rewardPoints || 0) < numAmount) {
      throw new Error("INSUFFICIENT_POINTS");
    }

    user.rewardPoints -= numAmount;
    await userRepository.save(user);

    const logEntry = rewardLogRepository.create({
      userId,
      label: "Redeemed Points",
      points: -numAmount,
    });
    await rewardLogRepository.save(logEntry);

    const summary = await this.getRewards(userId);
    return {
      points: summary.points,
      log: summary.log,
    };
  }
}

export default new RewardsService();
