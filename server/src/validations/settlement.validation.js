const { body } = require("express-validator");

const createSettlementValidation = [

    body("payerId")
        .isInt()
        .withMessage("payerId must be an integer"),

    body("receiverId")
        .isInt()
        .withMessage("receiverId must be an integer"),

    body("amount")
        .isFloat({ gt: 0 })
        .withMessage("Amount must be greater than zero"),

];

module.exports = {
    createSettlementValidation,
};