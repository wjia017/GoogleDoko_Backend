"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const response_helper_1 = require("../helpers/response.helper");
const message_helper_1 = require("../helpers/message.helper");
class UploadController {
    uploadImage(req, res) {
        try {
            if (!req.file) {
                (0, response_helper_1.sendError)(res, 400, message_helper_1.messages.upload.noFile);
                return;
            }
            const imageUrl = `/uploads/${req.file.filename}`;
            (0, response_helper_1.sendSuccess)(res, 200, message_helper_1.messages.upload.success, {
                url: imageUrl,
                filename: req.file.filename,
                size: req.file.size,
                mimetype: req.file.mimetype,
            });
        }
        catch (error) {
            console.error("Upload error:", error);
            (0, response_helper_1.sendError)(res, 500, message_helper_1.messages.common.internalServerError);
        }
    }
}
exports.UploadController = UploadController;
exports.default = new UploadController();
