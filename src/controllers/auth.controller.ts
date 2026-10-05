import {
  Request,
  Response,
} from "express";

import authService from "../services/auth.service";

import {
  sendSuccess,
} from "../helpers/response.helper";

import {
  messages,
} from "../helpers/message.helper";

import {
  LoginUserData,
  RegisterUserData,
} from "../types/auth.types";

export class AuthController {

  /*
  |--------------------------------------------------------------------------
  | Customer Registration
  |--------------------------------------------------------------------------
  */

  async register(
    req: Request,
    res: Response
  ): Promise<void> {

    const data =
      req.body as RegisterUserData;

    const user =
      await authService.register(data);

    sendSuccess(
      res,
      201,
      messages.auth.registrationSuccess,
      {
        user,
      }
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Vendor Registration
  |--------------------------------------------------------------------------
  */

  async registerVendor(
    req: Request,
    res: Response
  ): Promise<void> {

    const data =
      req.body as RegisterUserData;

    const user =
      await authService.registerVendor(data);

    sendSuccess(
      res,
      201,
      "Vendor registration successful.",
      {
        user,
      }
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Login
  |--------------------------------------------------------------------------
  */

  async login(
    req: Request,
    res: Response
  ): Promise<void> {

    const data =
      req.body as LoginUserData;

    const result =
      await authService.login(data);

    sendSuccess(
      res,
      200,
      messages.auth.loginSuccess,
      {
        user: result.user,
        token: result.token,
      }
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Get Current User
  |--------------------------------------------------------------------------
  */

  async getCurrentUser(
    req: Request,
    res: Response
  ): Promise<void> {

    const userId =
      req.user!.id;

    const user =
      await authService.getCurrentUser(
        userId
      );

    sendSuccess(
      res,
      200,
      messages.common.success,
      {
        user,
      }
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

  async logout(
    _req: Request,
    res: Response
  ): Promise<void> {

    sendSuccess(
      res,
      200,
      messages.auth.logoutSuccess
    );
  }
}

export default new AuthController();