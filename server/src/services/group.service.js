const groupRepository = require("../repositories/group.repository");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");

const createGroup = async (userId, groupData) => {
    // Business rule: Remove unnecessary spaces
    groupData.name = groupData.name.trim();

    return groupRepository.createGroup(userId, groupData);
};

const getUserGroups = async (userId) => {
    return groupRepository.getUserGroups(userId);
};

const getGroupById = async (groupId, userId) => {
    const group = await groupRepository.getGroupById(groupId);

    if(!group){
        throw new NotFoundError("Group not found");
    }

    const isMember = group.members.some(
        (member) => member.userId === userId
    );

    if(!isMember) {
        throw new ForbiddenError("You are not authorized to access this group");
    }

    return group;
};

module.exports = {
    createGroup,
    getUserGroups,
    getGroupById,
};

