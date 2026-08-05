const expenseService = require("../services/expense.service");
const asyncHandler = require("../utils/asyncHandler");

const createExpense = asyncHandler(async (req, res) => {

    const expense = await expenseService.createExpense(
        req.params.groupId,
        req.user.id,
        req.body
    );

    res.status(201).json({
        success: true,
        message: "Expense created successfully",
        data: expense,
    });

});

const getBalances = asyncHandler(async (req, res) => {
    const balances = await expenseService.calculateBalances(
        req.params.groupId,
        req.user.id
    );
    res.status(200).json({
        success: true,
        data: balances,
    });
});

const getSettlements = asyncHandler(async (req, res) => {
    const settlements = await expenseService.calculateSettlements(
        req.params.groupId,
        req.user.id
    );

    res.status(200).json({
        success: true,
        data: settlements,
    });
});

const getGroupExpenses = asyncHandler(async (req, res) => {

    const expenses = await expenseService.getGroupExpenses(
        req.params.groupId,
        req.user.id
    );

    res.status(200).json({
        success: true,
        data: expenses,
    });

});

module.exports = {
    createExpense,
    getBalances,
    getSettlements,
    getGroupExpenses,
};