const bcrypt = require("bcrypt");
const authRepository = require("../repositories/auth.repository");
const { generateToken } = require("../utils/jwt");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");

const registerUser = async (userData) => {
    const existingUser = await authRepository.findUserByEmail(userData.email);

    if( existingUser ){
        throw new ConflictError("Email already exists");
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
        throw new UnauthorizedError("Invalid email or password");
    }

    const isPasswordCorrect = await bcrypt.compare(
        password,
        user.password
    );

    if(!isPasswordCorrect){
        throw new UnauthorizedError("Invalid email or password");
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