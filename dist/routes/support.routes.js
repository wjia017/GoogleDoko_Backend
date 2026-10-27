"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const support_controller_1 = __importDefault(require("../controllers/support.controller"));
const validation_middleware_1 = require("../middleware/validation.middleware");
const support_validator_1 = require("../validations/support.validator");
const router = (0, express_1.Router)();
router.post("/", support_validator_1.supportInquiryValidator, validation_middleware_1.validateRequest, support_controller_1.default.submitContact);
router.post("/contact", support_validator_1.supportInquiryValidator, validation_middleware_1.validateRequest, support_controller_1.default.submitContact);
router.post("/support", support_validator_1.supportInquiryValidator, validation_middleware_1.validateRequest, support_controller_1.default.submitContact);
router.post("/newsletter", support_validator_1.subscriberValidator, validation_middleware_1.validateRequest, support_controller_1.default.subscribeNewsletter);
exports.default = router;
