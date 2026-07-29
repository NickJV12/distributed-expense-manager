const groupRepository = require("../repositories/group.repository");

const createGroup = async (userId, groupData) => {
    // Business rule: Remove unnecessary spaces
    groupData.name = groupData.name.trim();

    return groupRepository.createGroup(userId, groupData);
};

module.exports = {
    createGroup,
};

