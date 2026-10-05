import {
  body,
} from "express-validator";

/*
|--------------------------------------------------------------------------
| Customer / Vendor Registration Validation
|--------------------------------------------------------------------------
*/

export const registerValidator = [

  body("firstName")
    .trim()
    .notEmpty()
    .withMessage(
      "First name is required."
    )
    .isLength({
      max: 100,
    })
    .withMessage(
      "First name is too long."
    ),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage(
      "Last name is required."
    )
    .isLength({
      max: 100,
    })
    .withMessage(
      "Last name is too long."
    ),

  body("email")
    .trim()
    .notEmpty()
    .withMessage(
      "Email is required."
    )
    .isEmail()
    .withMessage(
      "Please provide a valid email address."
    )
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage(
      "Password is required."
    )
    .isLength({
      min: 6,
      max: 100,
    })
    .withMessage(
      "Password must be between 6 and 100 characters."
    ),

  body("phone")
    .optional()
    .trim()
    .isLength({
      max: 20,
    })
    .withMessage(
      "Phone number is too long."
    ),

  body("location")
    .optional()
    .trim()
    .isLength({
      max: 255,
    })
    .withMessage(
      "Location is too long."
    ),

  /*
  |--------------------------------------------------------------------------
  | Initial / Default Delivery Address
  |--------------------------------------------------------------------------
  */

  body("address")
    .notEmpty()
    .withMessage(
      "Address information is required."
    )
    .isObject()
    .withMessage(
      "Address must be an object."
    ),

  body("address.fullName")
    .trim()
    .notEmpty()
    .withMessage(
      "Address full name is required."
    )
    .isLength({
      max: 100,
    })
    .withMessage(
      "Address full name is too long."
    ),

  body("address.phone")
    .trim()
    .notEmpty()
    .withMessage(
      "Address phone number is required."
    )
    .isLength({
      max: 20,
    })
    .withMessage(
      "Address phone number is too long."
    ),

  body("address.addressLine")
    .trim()
    .notEmpty()
    .withMessage(
      "Address line is required."
    )
    .isLength({
      max: 255,
    })
    .withMessage(
      "Address line is too long."
    ),

  body("address.city")
    .trim()
    .notEmpty()
    .withMessage(
      "City is required."
    )
    .isLength({
      max: 100,
    })
    .withMessage(
      "City is too long."
    ),

  body("address.district")
    .optional()
    .trim()
    .isLength({
      max: 100,
    })
    .withMessage(
      "District is too long."
    ),

  body("address.province")
    .optional()
    .trim()
    .isLength({
      max: 100,
    })
    .withMessage(
      "Province is too long."
    ),

  body("address.postalCode")
    .optional()
    .trim()
    .isLength({
      max: 20,
    })
    .withMessage(
      "Postal code is too long."
    ),
];

/*
|--------------------------------------------------------------------------
| Login Validation
|--------------------------------------------------------------------------
*/

export const loginValidator = [

  body("email")
    .trim()
    .notEmpty()
    .withMessage(
      "Email is required."
    )
    .isEmail()
    .withMessage(
      "Please provide a valid email address."
    )
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage(
      "Password is required."
    ),
];