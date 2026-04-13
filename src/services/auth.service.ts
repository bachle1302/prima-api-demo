import prisma from '../prisma';
import { AppError } from '../utils/appError';
import { comparePassword, hashPassword } from '../utils/hash';
import {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
} from '../utils/jwt';

export const registerUser = async (email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await hashPassword(password);

    return prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            role: 'USER'
        }
    });
};

export const loginUser = async (
    email: string,
    password: string,
    userAgent: string,
    ip: string
) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });
    if (!user) {
        throw new AppError('Invalid credentials', 404);
    }
    console.log('Found user:', user);
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        throw new AppError('Wrong password', 401);
    }
    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);
    await prisma.refreshToken.create({
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
export const refreshTokenService = async (oldToken: string) => {
    if (!oldToken) {
        throw new Error('No token provided');
    }

    let payload;
    try {
        payload = verifyRefreshToken(oldToken);
    } catch (err) {
        throw new Error('Invalid or expired refresh token');
    }

    // 1. Kiểm tra token có tồn tại trong DB không
    const tokenInDb = await prisma.refreshToken.findUnique({
        where: { token: oldToken }
    });

    // Nếu không thấy trong DB hoặc token đã bị thu hồi (revoke)
    if (!tokenInDb) {
        throw new Error('Token has been revoked or is invalid');
    }

    // 2. Kiểm tra ngày hết hạn trong DB (optional nếu JWT đã có exp)
    if (new Date() > tokenInDb.expiresAt) {
        // Nếu hết hạn thì xóa luôn trong DB
        await prisma.refreshToken.delete({ where: { token: oldToken } });
        throw new Error('Refresh token expired');
    }

    // 3. CHỈ ký Access Token mới
    // Giữ nguyên Refresh Token cũ (oldToken)
    const newAccessToken = signAccessToken(payload);

    return {
        accessToken: newAccessToken
    };
};

export const getDevices = async (userId: number) => {
    return prisma.refreshToken.findMany({
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
export const logout = async (refeshtoken: string) => {
    if (!refeshtoken) return;
    await prisma.refreshToken.deleteMany({
        where: { token: refeshtoken }
    });
};

export const logoutAll = async (userId: number) => {
    if (!userId) return;
    await prisma.refreshToken.deleteMany({
        where: { userId }
    });
};
