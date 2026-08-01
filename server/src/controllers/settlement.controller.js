const settlementService = require("../services/settlement.service");
const asyncHandler = require("../utils/asyncHandler");

const recordSettlement = asyncHandler(async (req, res) => {

    const settlement =
        await settlementService.recordSettlement(
            req.params.groupId,
            req.user.id,
            req.body
        );

    res.status(201).json({
        success: true,
        message: "Settlement recorded successfully",
        data: settlement,
    });

});

const getSettlementHistory = asyncHandler(async (req, res) => {

    const settlements =
        await settlementService.getSettlementHistory(
            req.params.groupId,
            req.user.id
        );

    res.status(200).json({
        success: true,
        data: settlements,
    });

});

module.exports = {
    recordSettlement,
    getSettlementHistory,
};