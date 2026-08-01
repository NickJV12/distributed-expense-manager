const paymentService = require("../services/payment.service");

const asyncHandler = require("../utils/asyncHandler");

const generateQR = asyncHandler(async (req, res) => {

    const { amount } = req.body;

    const qr =
        await paymentService.generateMockQR(amount);

    res.status(200).json({
        success: true,
        data: qr,
    });

});

module.exports = {
    generateQR,
};