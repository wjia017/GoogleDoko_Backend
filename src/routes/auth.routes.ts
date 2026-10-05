import {
  Router,
} from "express";

import authController from "../controllers/auth.controller";

import {
  registerValidator,
  loginValidator,
} from "../validations/auth.validator";

import {
  validateRequest,
} from "../middleware/validation.middleware";

import {
  authenticate,
} from "../middleware/auth.middleware";

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

// Get currently logged-in user
router.get(
  "/me",
  authenticate,
  authController.getCurrentUser
);

// Logout
router.post(
  "/logout",
  authenticate,
  authController.logout
);

/*
|--------------------------------------------------------------------------
| Vendor Authentication
|--------------------------------------------------------------------------
*/

// Vendor registration
router.post(
  "/vendor/register",
  registerValidator,
  validateRequest,
  authController.registerVendor
);

export default router;