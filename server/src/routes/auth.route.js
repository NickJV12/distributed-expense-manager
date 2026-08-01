const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth.controller");
const validate = require("../middleware/validation.middleware");
const { registerValidation, loginValidation } = require("../validations/auth.validation");
const authenticate = require("../middleware/auth.middleware");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Shambhavi
 *               email:
 *                 type: string
 *                 example: shambhavi@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post(
    "/register",
    registerValidation,
    validate, 
    authController.register
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Login successful
 */

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