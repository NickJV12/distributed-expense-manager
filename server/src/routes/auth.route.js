const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validation.middleware");
const { registerValidation, loginValidation } = require("../validations/auth.validation");
const authenticate = require("../middleware/auth.middleware");

router.post(
    "/register",
    registerValidation,
    validate, 
    authController.register
);

router.post(
    "/login",
    loginValidation,
    validate,
    authController.login
);

router.get(
    "/profile",
    authenticate,
    authController.profile
);

module.exports = router;