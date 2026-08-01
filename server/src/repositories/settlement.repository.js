const db = require("../config/db");

const createSettlement = async (data) => {
    return db.settlement.create({
        data,
        include: {
            payer: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            receiver: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};

const getSettlementHistory = async (groupId) => {
    return db.settlement.findMany({
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
            receiver: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
};

module.exports = {
    createSettlement,
    getSettlementHistory,
};