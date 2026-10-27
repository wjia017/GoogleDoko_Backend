import { Router } from "express";
import supportController from "../controllers/support.controller";
import { validateRequest } from "../middleware/validation.middleware";
import {
  supportInquiryValidator,
  subscriberValidator,
} from "../validations/support.validator";

const router = Router();

router.post(
  "/",
  supportInquiryValidator,
  validateRequest,
  supportController.submitContact
);

router.post(
  "/contact",
  supportInquiryValidator,
  validateRequest,
  supportController.submitContact
);

router.post(
  "/support",
  supportInquiryValidator,
  validateRequest,
  supportController.submitContact
);

router.post(
  "/newsletter",
  subscriberValidator,
  validateRequest,
  supportController.subscribeNewsletter
);

export default router;
