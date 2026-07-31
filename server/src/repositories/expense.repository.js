const db = require("../config/db");

const createExpense = async (expenseData, participants) => {
    return db.$transaction(async (tx) => {

        // Step 1: Create the expense
        const expense = await tx.expense.create({
            data: expenseData,
        });

        // Step 2: Create all participants
        await tx.expenseParticipant.createMany({
            data: participants.map((participant) => ({
                expenseId: expense.id,
                userId: participant.userId,
                shareAmount: participant.shareAmount,
                amountPaid:
                    participant.userId === expenseData.paidBy
                        ? expenseData.totalAmount
                        : 0,
            })),
        });

        // Step 3: Return the complete expense with relations
        return await tx.expense.findUnique({
            where: {
                id: expense.id,
            },
            include: {
                payer: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                participants: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
                group: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
    });
};

const getGroupExpenses = async (groupId) => {
    return db.expense.findMany({
        where: {
            groupId: Number(groupId),
        },
        include: {
            payer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            participants: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
        },
    });
};

module.exports = {
    createExpense,
    getGroupExpenses,
};