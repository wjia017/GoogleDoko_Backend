import jwt from "jsonwebtoken";
import { UserRole } from "../entities/user.entity";

export interface JwtPayload {
  userId: number;
  role: UserRole;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured.");
  }

  return secret;
};

export const generateToken = (
  payload: JwtPayload
): string => {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: "7d",
  });
};

export const verifyToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    getJwtSecret()
  ) as JwtPayload;
};