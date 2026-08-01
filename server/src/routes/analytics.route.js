const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const analyticsController = require("../controllers/analytics.controller");

/**
 * @swagger
 * /analytics/monthly:
 *   get:
 *     summary: Monthly spending analytics
 *     tags:
 *       - Analytics
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly analytics
 */

router.get(
    "/analytics/monthly",
    authenticate,
    analyticsController.getMonthlySpending
);

router.get(
    "/analytics/groups",
    authenticate,
    analyticsController.getGroupAnalytics
);

module.exports = router;