const express = require("express");

const router = express.Router();

const groupController = require("../controllers/group.controller");
const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");

const {
    createGroupValidation,
    addMemberValidation,
} = require("../validations/group.validation");

router.post(
    "/",
    authenticate,
    createGroupValidation,
    validate,
    groupController.createGroup
);

router.get(
    "/",
    authenticate,
    groupController.getGroups
);

router.get(
    "/:groupId",
    authenticate,
    groupController.getGroup
);

router.get(
    "/:groupId/members",
    authenticate,
    groupController.getGroupMembers
);

router.post(
    "/:groupId/members",
    authenticate,
    addMemberValidation,
    validate,
    groupController.addMember
);

module.exports = router;