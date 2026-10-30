import { Response } from "express";

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data?: T
) => {
  return res.status(statusCode).json({
    ok: true,
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
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
