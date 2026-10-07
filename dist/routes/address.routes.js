"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controller_1 = __importDefault(require("../controllers/address.controller"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const validation_middleware_1 = require("../middleware/validation.middleware");
const address_validator_1 = require("../validations/address.validator");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authenticate);
router.post("/", address_validator_1.createAddressValidator, validation_middleware_1.validateRequest, address_controller_1.default.create);
router.get("/", address_controller_1.default.getAll);
router.get("/:id", address_controller_1.default.getOne);
router.put("/:id", address_validator_1.updateAddressValidator, validation_middleware_1.validateRequest, address_controller_1.default.update);
router.patch("/:id/default", address_controller_1.default.setDefault);
router.delete("/:id", address_controller_1.default.delete);
exports.default = router;
