const generateMockQR = async (amount) => {

    const upiId = "expensemanager@upi";
    const payeeName = "Distributed Expense Manager";

    const qrData =
        `upi://pay?pa=${upiId}` +
        `&pn=${encodeURIComponent(payeeName)}` +
        `&am=${amount}` +
        `&cu=INR` +
        `&tn=${encodeURIComponent("Settlement Payment")}`;

    return {
        amount,
        qrData,
    };
};

module.exports = {
    generateMockQR,
};