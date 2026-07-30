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

const addMemberValidation = [
    body("email")
       .trim()
       .isEmail()
       .withMessage("Please provide a valid email address"),
];

module.exports = {
    createGroupValidation,
    addMemberValidation,
};