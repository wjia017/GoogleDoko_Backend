import { Request, Response } from "express";
import { TestService } from "../services/test.service";

export class TestController {
  static async test(
    _req: Request,
    res: Response
  ): Promise<void> {
    const message = await TestService.test();

    res.status(200).json({
      success: true,
      message,
    });
  }
}