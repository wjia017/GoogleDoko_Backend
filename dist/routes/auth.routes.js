"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const auth_validator_1 = require("../validations/auth.validator");
const validation_middleware_1 = require("../middleware/validation.middleware");
const auth_middleware_1 = require("../middleware/auth.middleware");
const upload_middleware_1 = require("../middleware/upload.middleware");
const router = (0, express_1.Router)();
/*
|--------------------------------------------------------------------------
| Customer Authentication
|--------------------------------------------------------------------------
*/
// Customer registration
router.post("/register", auth_validator_1.registerValidator, validation_middleware_1.validateRequest, auth_controller_1.default.register);
// Login
router.post("/login", auth_validator_1.loginValidator, validation_middleware_1.validateRequest, auth_controller_1.default.login);
// Get currently logged-in user profile & session
router.get("/me", auth_middleware_1.authenticate, auth_controller_1.default.getMe);
// Logout
router.post("/logout", auth_middleware_1.authenticate, auth_controller_1.default.logout);
// Password recovery
router.post("/forgot", auth_validator_1.forgotPasswordValidator, validation_middleware_1.validateRequest, auth_controller_1.default.forgotPassword);
router.post("/reset", auth_validator_1.resetPasswordValidator, validation_middleware_1.validateRequest, auth_controller_1.default.resetPassword);
// Profile and Password updates
router.put("/profile", auth_middleware_1.authenticate, auth_validator_1.updateProfileValidator, validation_middleware_1.validateRequest, auth_controller_1.default.updateProfile);
router.put("/password", auth_middleware_1.authenticate, auth_validator_1.changePasswordValidator, validation_middleware_1.validateRequest, auth_controller_1.default.changePassword);
// Shop settings
router.put("/shop", auth_middleware_1.authenticate, auth_validator_1.updateShopValidator, validation_middleware_1.validateRequest, auth_controller_1.default.updateShop);
// Profile photo upload
router.post("/photo", auth_middleware_1.authenticate, upload_middleware_1.upload.single("photo"), auth_controller_1.default.uploadProfilePhoto);
/*
|--------------------------------------------------------------------------
| Vendor Authentication
|--------------------------------------------------------------------------
*/
router.post("/vendor/register", auth_validator_1.registerVendorValidator, validation_middleware_1.validateRequest, auth_controller_1.default.registerVendor);
router.post("/register-vendor", auth_validator_1.registerVendorValidator, validation_middleware_1.validateRequest, auth_controller_1.default.registerVendor);
/*
|--------------------------------------------------------------------------
| Admin Authentication
|--------------------------------------------------------------------------
*/
router.post("/register-admin", auth_validator_1.registerAdminValidator, validation_middleware_1.validateRequest, auth_controller_1.default.registerAdmin);
exports.default = router;
