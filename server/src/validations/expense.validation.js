const { body } = require("express-validator");

const expenseValidationRules = [
    body("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),

    body("totalAmount")
        .isFloat({ gt: 0 })
        .withMessage("Total amount must be greater than 0"),

    body("paidBy")
        .isInt()
        .withMessage("Paid by must be a valid user ID"),

    body("participants")
        .isArray({ min: 1 })
        .withMessage("At least one participant is required"),

    body("participants.*.userId")
        .isInt()
        .withMessage("Participant userId must be an integer"),

    body("participants.*.shareAmount")
        .isFloat({ gt: 0 })
        .withMessage("Share amount must be greater than 0"),
];

const createExpenseValidation = [...expenseValidationRules];
const updateExpenseValidation = [...expenseValidationRules];

module.exports = {
    createExpenseValidation,
    updateExpenseValidation,
};