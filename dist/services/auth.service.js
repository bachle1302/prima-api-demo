"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutAll = exports.logout = exports.getDevices = exports.refreshTokenService = exports.loginUser = exports.registerUser = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const AppError_1 = require("../utils/AppError");
const hash_1 = require("../utils/hash");
const jwt_1 = require("../utils/jwt");
const registerUser = async (email, password) => {
    const existingUser = await prisma_1.default.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await (0, hash_1.hashPassword)(password);
    return prisma_1.default.user.create({
        data: {
            email,
            password: hashedPassword,
            role: 'USER'
        }
    });
};
exports.registerUser = registerUser;
const loginUser = async (email, password, userAgent, ip) => {
    const user = await prisma_1.default.user.findUnique({
        where: { email }
    });
    if (!user) {
        throw new AppError_1.AppError('Invalid credentials', 404);
    }
    console.log('Found user:', user);
    const isMatch = await (0, hash_1.comparePassword)(password, user.password);
    if (!isMatch) {
        throw new AppError_1.AppError('Wrong password', 401);
    }
    const accessToken = (0, jwt_1.signAccessToken)(user);
    const refreshToken = (0, jwt_1.signRefreshToken)(user);
    await prisma_1.default.refreshToken.create({
        data: {
            token: refreshToken,
            userId: user.id,
            userAgent,
            ip,
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
    });
    return { accessToken, refreshToken };
};
exports.loginUser = loginUser;
const refreshTokenService = async (oldToken) => {
    if (!oldToken) {
        throw new Error('No token provided');
    }
    let payload;
    console.log('Received refresh token:', oldToken);
    try {
        payload = (0, jwt_1.verifyRefreshToken)(oldToken);
        console.log('Payload from refresh token:', payload);
    }
    catch (err) {
        throw new Error('Invalid token');
    }
    // tìm user theo token
    const tokenInDb = await prisma_1.default.refreshToken.findUnique({
        where: { token: oldToken }
    });
    if (!tokenInDb) {
        throw new Error('Invalid token');
    }
    console.log('trước khi xóa token cũ, đã tìm thấy token trong database:', tokenInDb);
    await prisma_1.default.refreshToken.delete({
        where: { token: oldToken }
    });
    const newAccessToken = (0, jwt_1.signAccessToken)(payload);
    const newRefreshToken = (0, jwt_1.signRefreshToken)(payload);
    console.log('xin chào' + newAccessToken, newRefreshToken);
    // tạo token mới
    try {
        await prisma_1.default.refreshToken.create({
            data: {
                token: newRefreshToken,
                userId: payload.userId,
                userAgent: tokenInDb.userAgent,
                ip: tokenInDb.ip,
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
            }
        });
        console.log('đã chạy đến sau khi tạo refresh token mới và thêm vào database');
    }
    catch (err) {
        console.error('Lỗi khi tạo refresh token mới:', err);
        throw new Error('Failed to create new refresh token');
    }
    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
    };
};
exports.refreshTokenService = refreshTokenService;
const getDevices = async (userId) => {
    return prisma_1.default.refreshToken.findMany({
        where: { userId },
        select: {
            id: true,
            userAgent: true,
            ip: true,
            expiresAt: true,
            createdAt: true
        }
    });
};
exports.getDevices = getDevices;
const logout = async (refeshtoken) => {
    if (!refeshtoken)
        return;
    await prisma_1.default.refreshToken.deleteMany({
        where: { token: refeshtoken }
    });
};
exports.logout = logout;
const logoutAll = async (userId) => {
    if (!userId)
        return;
    await prisma_1.default.refreshToken.deleteMany({
        where: { userId }
    });
};
exports.logoutAll = logoutAll;
