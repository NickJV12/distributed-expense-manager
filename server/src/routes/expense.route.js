const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expense.controller");

const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
    createExpenseValidation,
} = require("../validations/expense.validation");

/**
 * @swagger
 * /groups/{groupId}/expenses:
 *   post:
 *     summary: Create expense
 *     tags:
 *       - Expenses
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       201:
 *         description: Expense created
 */

router.post(
    "/groups/:groupId/expenses",
    authenticate,
    createExpenseValidation,
    validate,
    expenseController.createExpense
);

router.get(
    "/groups/:groupId/expenses",
    authenticate,
    expenseController.getGroupExpenses
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