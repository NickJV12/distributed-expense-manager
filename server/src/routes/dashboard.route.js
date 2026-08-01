const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const dashboardController = require("../controllers/dashboard.controller");

router.get(
    "/dashboard",
    authenticate,
    dashboardController.getDashboardSummary
);

module.exports = router;