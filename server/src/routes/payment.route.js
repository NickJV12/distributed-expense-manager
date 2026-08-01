const express = require("express");

const router = express.Router();

const authenticate = require("../middleware/auth.middleware");

const paymentController = require("../controllers/payment.controller");

router.post(
    "/payments/qr",
    authenticate,
    paymentController.generateQR
);

module.exports = router;