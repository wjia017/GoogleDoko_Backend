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


export const authorize = (
  ...allowedRoles: UserRole[]
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
        "Authentication required."
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
        "You do not have permission to access this resource."
      );

      return;
    }

    
    next();
  };
};

export default authorize;