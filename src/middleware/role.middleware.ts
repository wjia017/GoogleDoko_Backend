import {
  NextFunction,
  Request,
  Response,
} from "express";

import {
  UserRole,
} from "../entities/user.entity";

import {
  sendError,
} from "../helpers/response.helper";

import {
  messages,
} from "../helpers/message.helper";

export const authorize = (
  ...allowedRoles: (UserRole | string)[]
) => {
  return (
    req: Request,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      sendError(
        res,
        401,
        messages.auth.authenticationRequired
      );
      return;
    }

    if (
      !allowedRoles.includes(
        req.user.role as UserRole
      )
    ) {
      sendError(
        res,
        403,
        messages.common.forbidden
      );
      return;
    }

    next();
  };
};

export const adminOnly = authorize(UserRole.ADMIN, "admin");
export const vendorOnly = authorize(UserRole.VENDOR, "vendor");

export default authorize;
