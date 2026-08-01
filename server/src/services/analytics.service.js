const analyticsRepository = require("../repositories/analytics.repository");

const getMonthlySpending = async (userId) => {

    return analyticsRepository.getMonthlySpending(userId);

};

const getGroupAnalytics = async (userId) => {

    return analyticsRepository.getGroupAnalytics(userId);

};

module.exports = {
    getMonthlySpending,
    getGroupAnalytics,
};