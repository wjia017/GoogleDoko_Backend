import { Router } from "express";
import uploadController from "../controllers/upload.controller";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();

router.post(
  "/",
  authenticate,
  upload.single("image"),
  uploadController.uploadImage
);

export default router;
