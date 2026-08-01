const dashboardService = require("../services/dashboard.service");
const asyncHandler = require("../utils/asyncHandler");

const getDashboardSummary = asyncHandler(async (req, res) => {

    const dashboard =
        await dashboardService.getDashboardSummary(
            req.user.id
        );

    res.status(200).json({
        success: true,
        data: dashboard,
    });

});

module.exports = {
    getDashboardSummary,
};