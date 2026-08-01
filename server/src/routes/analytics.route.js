const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const analyticsController = require("../controllers/analytics.controller");

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