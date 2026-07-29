const { body } = require("express-validator");

const createGroupValidation = [
    body("name")
       .trim()
       .notEmpty()
       .withMessage("Group name is required"),

    body("description")
       .optional()
       .trim(),
];

module.exports = {
    createGroupValidation,
};