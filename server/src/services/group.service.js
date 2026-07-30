const groupRepository = require("../repositories/group.repository");
const NotFoundError = require("../errors/NotFoundError");
const ForbiddenError = require("../errors/ForbiddenError");
const ConflictError = require("../errors/ConflictError");

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

const addMember = async (groupId, ownerId, email) => {
    //Check whether group exists
    const group = await groupRepository.getGroupById(groupId);

    if(!group){
        throw new NotFoundError("Group not found");
    }

    //Check requester membership
    const ownerMembership = await groupRepository.findMembership(
        groupId,
        ownerId
    );

    if(!ownerMembership){
        throw new ForbiddenError("You are not a member of this group");
    }

    //Check requester role
    if(ownerMembership.role !== "OWNER"){
        throw new ForbiddenError("Only the group owner can add members");
    }

    //Find invited user
    const user = await groupRepository.findUserByEmail(email);

    if(!user){
        throw new NotFoundError("User not found");
    }

    //Check duplicate membership
    const existingMembership = await groupRepository.findMembership(groupId, user.id);

    if(existingMembership){
        throw new ConflictError("User is already a member of this group");
    }

    return groupRepository.addMember(groupId, user.id);
}

module.exports = {
    createGroup,
    getUserGroups,
    getGroupById,
    addMember,
};

