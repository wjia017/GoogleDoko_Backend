import { body } from "express-validator";

export const redeemPointsValidator = [
  body().custom((b) => {
    const amount = Number(b?.amount ?? b?.points);
    if (!amount || amount < 1) {
      throw new Error("Amount must be at least 1.");
    }
    return true;
  }),
];
