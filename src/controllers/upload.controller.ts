import { Request, Response } from "express";
import { sendSuccess, sendError } from "../helpers/response.helper";
import { messages } from "../helpers/message.helper";

export class UploadController {
  uploadImage(req: Request, res: Response): void {
    try {
      if (!req.file) {
        sendError(res, 400, messages.upload.noFile);
        return;
      }

      const imageUrl = `/uploads/${req.file.filename}`;
      sendSuccess(res, 200, messages.upload.success, {
        url: imageUrl,
        filename: req.file.filename,
        size: req.file.size,
        mimetype: req.file.mimetype,
      });
    } catch (error) {
      console.error("Upload error:", error);
      sendError(res, 500, messages.common.internalServerError);
    }
  }
}

export default new UploadController();
