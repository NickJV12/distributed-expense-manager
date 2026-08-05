const bcrypt = require("bcrypt");
const authRepository = require("../repositories/auth.repository");
const { generateToken } = require("../utils/jwt");
const ConflictError = require("../errors/ConflictError");
const UnauthorizedError = require("../errors/UnauthorizedError");
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);

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

const googleLogin = async (googleToken) => {

    const ticket = await client.verifyIdToken({
        idToken: googleToken,
        audience: process.env.VITE_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
        email,
        name,
    } = payload;

    let user =
        await authRepository.findUserByEmail(email);

    if (!user) {

        user = await authRepository.createUser({
            name,
            email,

            // Google users don't use this password
            password: "",
            isGoogleUser: true,
        });

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
    googleLogin,
};