import jwt, { SignOptions } from "jsonwebtoken";
import { UserRole } from "../entities/user.entity";

export interface JwtPayload {
  userId: number;
  role: UserRole | string;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET || "GoogleDoko_Secret_Key_2026";
  return secret;
};

export const generateToken = (
  payload: JwtPayload,
  expiresIn: string = process.env.JWT_EXPIRES_IN || "7d"
): string => {
  const options: SignOptions = {
    expiresIn: expiresIn as unknown as NonNullable<SignOptions["expiresIn"]>,
  };
  return jwt.sign(payload, getJwtSecret(), options);
};

export const verifyToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    getJwtSecret()
  ) as JwtPayload;
};
