const express = require("express");

const router = express.Router();

const groupController = require("../controllers/group.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
    createGroupValidation,
} = require("../validations/group.validation");

router.post(
    "/",
    authenticate,
    createGroupValidation,
    validate,
    groupController.createGroup
);

module.exports = router;