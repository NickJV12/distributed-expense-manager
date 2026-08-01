const express = require("express");

const router = express.Router();

const settlementController = require("../controllers/settlement.controller");

const authenticate = require("../middleware/auth.middleware");

const validate = require("../middleware/validation.middleware");

const {
    createSettlementValidation,
} = require("../validations/settlement.validation");

router.post(
    "/groups/:groupId/settlements",
    authenticate,
    createSettlementValidation,
    validate,
    settlementController.recordSettlement
);

router.get(
    "/groups/:groupId/settlements",
    authenticate,
    settlementController.getSettlementHistory
);

module.exports = router;