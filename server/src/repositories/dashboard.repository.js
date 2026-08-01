const db = require("../config/db");

const getDashboardSummary = async (userId) => {

    const totalGroups = await db.groupMember.count({
        where: {
            userId: Number(userId),
        },
    });

    const totalExpenses = await db.expenseParticipant.count({
        where: {
            userId: Number(userId),
        },
    });

    const paidExpenses = await db.expense.aggregate({
        where: {
            paidBy: Number(userId),
        },
        _sum: {
            totalAmount: true,
        },
    });

    const recentExpenses = await db.expense.findMany({
        where: {
            participants: {
                some: {
                    userId: Number(userId),
                },
            },
        },
        include: {
            group: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
        take: 5,
    });

    return {
        totalGroups,
        totalExpenses,
        totalPaid: Number(
            paidExpenses._sum.totalAmount || 0
        ),
        recentExpenses,
    };
};

module.exports = {
    getDashboardSummary,
};