import { Request, Response } from "express";
import { TestService } from "../services/test.service";
import { sendSuccess } from "../helpers/response.helper";

export class TestController {
  static async test(
    _req: Request,
    res: Response
  ): Promise<void> {
    const message = await TestService.test();
    sendSuccess(res, 200, message);
  }
}

export default new class {
  test = TestController.test;
}();
