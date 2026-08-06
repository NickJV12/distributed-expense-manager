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

const getUserGroups = async (userId) => {
    return db.groupMember.findMany({
        where: {
            userId,
        },
        include: {
            group: true,
        },
        orderBy: {
            joinedAt: "desc", 
        },
    });
};

const getGroupById = async (groupId) => {
    return db.group.findUnique({
        where: {
            id: Number(groupId),
        },
        include: {
            members: {
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                },
            },
        },
    });
};

const findUserByEmail = async (email) => {
    return db.user.findUnique({
        where: {
            email,
        },
    });
};

const findMembership = async (groupId, userId) => {
    return db.groupMember.findUnique({
        where: {
            groupId_userId: {
                groupId: Number(groupId),
                userId,
            },
        },
    });
};

const addMember = async (groupId, userId) => {
    return db.groupMember.create({
        data: {
            groupId: Number(groupId),
            userId,
            role: "MEMBER",
        },
    });
};

const getGroupMembers = async (groupId) => {
    return db.groupMember.findMany({
        where: {
            groupId: Number(groupId),
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
};

module.exports = {
    createGroup,
    getUserGroups,
    getGroupById,
    findUserByEmail,
    findMembership,
    addMember,
    getGroupMembers
};
