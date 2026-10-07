"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.uploadsDir = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
exports.uploadsDir = process.env.UPLOADS_DIR || path_1.default.join(process.cwd(), "uploads");
if (!fs_1.default.existsSync(exports.uploadsDir)) {
    fs_1.default.mkdirSync(exports.uploadsDir, { recursive: true });
}
let multerMiddleware = null;
try {
    const multer = require("multer");
    const storage = multer.diskStorage({
        destination: (_req, _file, cb) => cb(null, exports.uploadsDir),
        filename: (_req, file, cb) => {
            const ext = path_1.default.extname(file.originalname).toLowerCase() || ".jpg";
            const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
            cb(null, uniqueName);
        },
    });
    multerMiddleware = multer({
        storage,
        limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
        fileFilter: (_req, file, cb) => {
            const allowed = /jpeg|jpg|png|webp|gif/;
            const ext = allowed.test(path_1.default.extname(file.originalname).toLowerCase());
            const mime = allowed.test(file.mimetype);
            if (ext && mime) {
                cb(null, true);
            }
            else {
                cb(new Error("Only images (jpeg, jpg, png, webp, gif) up to 5MB are allowed."));
            }
        },
    });
}
catch {
    // Graceful fallback if multer module is not present in local environment
    multerMiddleware = {
        single: (fieldName) => (req, _res, next) => {
            if (req.body && req.body[fieldName]) {
                req.file = {
                    fieldname: fieldName,
                    originalname: `${fieldName}.jpg`,
                    encoding: "7bit",
                    mimetype: "image/jpeg",
                    size: 1024,
                    destination: exports.uploadsDir,
                    filename: `${fieldName}-${Date.now()}.jpg`,
                    path: path_1.default.join(exports.uploadsDir, `${fieldName}-${Date.now()}.jpg`),
                };
            }
            next();
        },
    };
}
exports.upload = multerMiddleware;
