const dashboardRepository = require("../repositories/dashboard.repository");

const getDashboardSummary = async (userId) => {

    return dashboardRepository.getDashboardSummary(userId);

};

module.exports = {
    getDashboardSummary,
};