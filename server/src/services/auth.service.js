const bcrypt = require("bcrypt");
const authRepository = require("../repositories/auth.repository");
const { generateToken } = require("../utils/jwt");

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

const loginUser = async ({email, password}) => {
    const user = await authRepository.findUserByEmail(email);

    if(!user){
        throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if(!isPasswordCorrect){
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        token,
    };
};

module.exports = {
    registerUser,
    loginUser,
};