import { Router } from "express";

import authController from "../controllers/auth.controller";
import {
  registerValidator,
  registerVendorValidator,
  registerAdminValidator,
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  changePasswordValidator,
  updateProfileValidator,
  updateShopValidator,
} from "../validations/auth.validator";

import { validateRequest } from "../middleware/validation.middleware";
import { authenticate } from "../middleware/auth.middleware";
import { upload } from "../middleware/upload.middleware";

const router = Router();

/*
|--------------------------------------------------------------------------
| Customer Authentication
|--------------------------------------------------------------------------
*/

// Customer registration
router.post(
  "/register",
  registerValidator,
  validateRequest,
  authController.register
);

// Login
router.post(
  "/login",
  loginValidator,
  validateRequest,
  authController.login
);

// Get currently logged-in user profile & session
router.get(
  "/me",
  authenticate,
  authController.getMe
);

// Logout
router.post(
  "/logout",
  authenticate,
  authController.logout
);

// Password recovery
router.post(
  "/forgot",
  forgotPasswordValidator,
  validateRequest,
  authController.forgotPassword
);

router.post(
  "/reset",
  resetPasswordValidator,
  validateRequest,
  authController.resetPassword
);

// Profile and Password updates
router.put(
  "/profile",
  authenticate,
  updateProfileValidator,
  validateRequest,
  authController.updateProfile
);

router.put(
  "/password",
  authenticate,
  changePasswordValidator,
  validateRequest,
  authController.changePassword
);

// Shop settings
router.put(
  "/shop",
  authenticate,
  updateShopValidator,
  validateRequest,
  authController.updateShop
);

// Profile photo upload
router.post(
  "/photo",
  authenticate,
  upload.single("photo"),
  authController.uploadProfilePhoto
);

/*
|--------------------------------------------------------------------------
| Vendor Authentication
|--------------------------------------------------------------------------
*/

router.post(
  "/vendor/register",
  registerVendorValidator,
  validateRequest,
  authController.registerVendor
);

router.post(
  "/register-vendor",
  registerVendorValidator,
  validateRequest,
  authController.registerVendor
);

/*
|--------------------------------------------------------------------------
| Admin Authentication
|--------------------------------------------------------------------------
*/

router.post(
  "/register-admin",
  registerAdminValidator,
  validateRequest,
  authController.registerAdmin
);

export default router;
