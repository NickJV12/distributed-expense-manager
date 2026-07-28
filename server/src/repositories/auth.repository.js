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

module.exports = {
    findUserByEmail,
    createUser
};