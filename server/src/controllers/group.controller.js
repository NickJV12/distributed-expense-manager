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

const addMember = asyncHandler(async (req, res) => {
    const { groupId } = req.params;
    const { email } = req.body;

    await groupService.addMember(
        groupId,
        req.user.id,
        email
    );

    res.status(201).json({
        success: true,
        message: "Member added successfully",
    });
});

const getGroupMembers = asyncHandler(async (req, res) => {

    const members = await groupService.getGroupMembers(
        req.params.groupId,
        req.user.id
    );

    res.status(200).json({
        success: true,
        data: members,
    });

});

module.exports = {
    createGroup,
    getGroups,
    getGroup,
    addMember,
    getGroupMembers,
};

