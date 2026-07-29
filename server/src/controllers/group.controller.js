const groupService = require("../services/group.service");
const asyncHandler = require("../utils/asyncHandler");

const createGroup = asyncHandler(async (req, res) => {
    const group = await groupService.createGroup(
        req.user.id,
        req.body
    );

    res.status(201).json({
        success: true,
        message: "Group created successfully",
        data: group,
    });
});

module.exports = {
    createGroup,
};

