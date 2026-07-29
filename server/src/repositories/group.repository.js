const db = require("../config/db");

const createGroup = async (userId, groupData) => {
    return db.$transaction(async (tx) => {
        // Step 1: Create the group
        const group = await tx.group.create({
            data: {
                name: groupData.name,
                description: groupData.description,
                createdBy: userId,
            },
        });

        // Step 2: Add creator as OWNER
        await tx.groupMember.create({
            data: {
                groupId: group.id,
                userId: userId,
                role: "OWNER",
            },
        });

        return group;
    });
};

module.exports = {
    createGroup,
};
