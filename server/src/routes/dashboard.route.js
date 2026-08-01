const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const dashboardController = require("../controllers/dashboard.controller");

/**
 * @swagger
 * /dashboard:
 *   get:
 *     summary: Get dashboard summary
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data
 */

router.get(
    "/dashboard",
    authenticate,
    dashboardController.getDashboardSummary
);

module.exports = router;