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

const login = asyncHandler(async (req, res) => {
    const result = await authService.loginUser(req.body);

    res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
    });
});

const profile = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        message: "Profile fetched successfully",
        data: req.user,
    });
});

module.exports = {
    register,
    login,
    profile,
};