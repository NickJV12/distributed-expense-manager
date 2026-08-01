const db = require("../config/db");

const getMonthlySpending = async (userId) => {

    const expenses = await db.expense.findMany({
        where: {
            participants: {
                some: {
                    userId: Number(userId),
                },
            },
        },
        select: {
            totalAmount: true,
            createdAt: true,
        },
    });

    const monthlyData = {};

    expenses.forEach((expense) => {

        const month = expense.createdAt.toLocaleString("default", {
            month: "short",
        });

        if (!monthlyData[month]) {
            monthlyData[month] = 0;
        }

        monthlyData[month] += Number(expense.totalAmount);

    });

    return Object.entries(monthlyData).map(([month, total]) => ({
        month,
        total,
    }));
};

const getGroupAnalytics = async (userId) => {

    const memberships = await db.groupMember.findMany({
        where: {
            userId: Number(userId),
        },
        include: {
            group: {
                include: {
                    expenses: true,
                },
            },
        },
    });

    return memberships.map((membership) => ({

        groupName: membership.group.name,

        totalSpent: membership.group.expenses.reduce(
            (sum, expense) =>
                sum + Number(expense.totalAmount),
            0
        ),

    }));
};

module.exports = {
    getMonthlySpending,
    getGroupAnalytics,
};