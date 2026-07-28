const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validation.middleware");
const { registerValidation } = require("../validations/auth.validation");

router.post(
    "/register",
    registerValidation,
    validate, 
    authController.register
);

module.exports = router;