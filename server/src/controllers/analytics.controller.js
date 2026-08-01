const analyticsService = require("../services/analytics.service");
const asyncHandler = require("../utils/asyncHandler");

const getMonthlySpending = asyncHandler(async (req, res) => {

    const data =
        await analyticsService.getMonthlySpending(
            req.user.id
        );

    res.status(200).json({
        success: true,
        data,
    });

});

const getGroupAnalytics = asyncHandler(async (req, res) => {

    const data =
        await analyticsService.getGroupAnalytics(
            req.user.id
        );

    res.status(200).json({
        success: true,
        data,
    });

});

module.exports = {
    getMonthlySpending,
    getGroupAnalytics,
};