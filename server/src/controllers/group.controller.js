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

const getGroups = asyncHandler(async (req, res) => {
    const groups = await groupService.getUserGroups(req.user.id);

    res.status(200).json({
        success: true,
        data: groups,
    });
});

const getGroup = asyncHandler(async (req, res) => {
    const group = await groupService.getGroupById(
        req.params.groupId,
        req.user.id
    );

    res.status(200).json({
        success: true,
        data: group,
    });
});

module.exports = {
    createGroup,
    getGroups,
    getGroup,
};

