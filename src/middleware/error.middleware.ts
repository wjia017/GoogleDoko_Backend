import {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  sendError,
} from "../helpers/response.helper";

import {
  messages,
} from "../helpers/message.helper";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(err);

  if (
    err instanceof Error
  ) {
    switch (err.message) {
      case "ACCOUNT_ALREADY_EXISTS":
        sendError(
          res,
          409,
          messages.auth.accountAlreadyExists
        );
        return;

      case "INVALID_CREDENTIALS":
        sendError(
          res,
          401,
          messages.auth.invalidCredentials
        );
        return;

      case "USER_NOT_FOUND":
        sendError(
          res,
          404,
          messages.auth.userNotFound
        );
        return;
    }
  }

  sendError(
    res,
    500,
    messages.common.internalServerError
  );
};