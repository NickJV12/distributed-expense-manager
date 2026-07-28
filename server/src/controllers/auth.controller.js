const authService = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");

const register = asyncHandler(async (req, res) => {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
    });
});

module.exports = {
    register,
};