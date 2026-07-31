const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense.controller");

const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
    createExpenseValidation,
} = require("../validations/expense.validation");

router.post(
    "/groups/:groupId/expenses",
    authenticate,
    createExpenseValidation,
    validate,
    expenseController.createExpense
);

router.get(
    "/groups/:groupId/balances",
    authenticate,
    expenseController.getBalances
);

router.get(
    "/groups/:groupId/settlements",
    authenticate,
    expenseController.getSettlements
);

module.exports = router;