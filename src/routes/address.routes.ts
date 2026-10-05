import { Router } from "express";
import addressController from "../controllers/address.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.use(authenticate);

router.post("/", addressController.create);

router.get("/", addressController.getAll);

router.get("/:id", addressController.getOne);

router.patch("/:id/default", addressController.setDefault);

router.delete("/:id", addressController.delete);

export default router;