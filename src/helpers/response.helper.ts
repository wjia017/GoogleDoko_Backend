import { Response } from "express";

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  const isPlainObj =
    data !== undefined &&
    typeof data === "object" &&
    data !== null &&
    !Array.isArray(data);

  return res.status(statusCode).json({
    ok: true,
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
    ...(isPlainObj ? (data as Record<string, unknown>) : {}),
  });
};

export const sendError = (
  res: Response,
  statusCode: number,
  message: string,
  errors?: unknown
) => {
  return res.status(statusCode).json({
    ok: false,
    success: false,
    message,
    error: message,
    ...(errors !== undefined ? { errors } : {}),
  });
};
