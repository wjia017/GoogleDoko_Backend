import {
  NextFunction,
  Request,
  Response,
} from "express";

import { validationResult } from "express-validator";

import { sendError } from "../helpers/response.helper";
import { messages } from "../helpers/message.helper";

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors
      .array({ onlyFirstError: true })
      .map((error) => ({
        field:
          "path" in error
            ? error.path
            : "unknown",
        message: error.msg,
      }));

    sendError(
      res,
      400,
      messages.common.validationFailed,
      formattedErrors
    );

    return;
  }

  next();
};
