import { Router } from "express";
import addressController from "../controllers/address.controller";
import { authenticate } from "../middleware/auth.middleware";
import { validateRequest } from "../middleware/validation.middleware";
import {
  createAddressValidator,
  updateAddressValidator,
} from "../validations/address.validator";

const router = Router();

router.use(authenticate);

router.post(
  "/",
  createAddressValidator,
  validateRequest,
  addressController.create
);

router.get("/", addressController.getAll);

router.get("/:id", addressController.getOne);

router.put(
  "/:id",
  updateAddressValidator,
  validateRequest,
  addressController.update
);

router.patch("/:id/default", addressController.setDefault);

router.delete("/:id", addressController.delete);

export default router;
