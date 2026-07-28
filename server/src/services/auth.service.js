const bcrypt = require("bcrypt");
const authRepository = require("../repositories/auth.repository");

const registerUser = async (userData) => {
    const existingUser = await authRepository.findUserByEmail(userData.email);

    if( existingUser ){
        throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    return authRepository.createUser({
        ...userData,
        password: hashedPassword,
    });
};

module.exports = {
    registerUser,
};