const db = require("../config/db");

const findUserByEmail = async (email) => {
    return db.user.findUnique({
        where : { email }
    });
};

const createUser = async (userData) => {
    return db.user.create({
        data: userData
    });
};

const findUserById = async (id) => {
    return db.user.findUnique({
        where: { id },
    });
};

module.exports = {
    findUserByEmail,
    createUser,
    findUserById,
};