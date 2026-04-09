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
        console.log('Payload from refresh token:', payload);
    } catch (err) {
        throw new Error('Invalid token');
    }

    // tìm user theo token
    const tokenInDb = await prisma.refreshToken.findUnique({
        where: { token: oldToken }
    });

    if (!tokenInDb) {
        throw new Error('Invalid token');
    }
    console.log('Found token in database:', tokenInDb);

    const newAccessToken = signAccessToken(payload);
    const newRefreshToken = signRefreshToken(payload);

    try {
        // Delete old token và create new token atomically
        await Promise.all([
            prisma.refreshToken.delete({
                where: { token: oldToken }
            }),
            prisma.refreshToken.create({
                data: {
                    token: newRefreshToken,
                    userId: payload.userId,
                    userAgent: tokenInDb.userAgent,
                    ip: tokenInDb.ip,
                    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
                }
            })
        ]);
        console.log('✓ Token rotated successfully');
    } catch (err) {
        console.error('Lỗi khi rotate refresh token:', err);
        throw new Error('Failed to rotate refresh token');
    }

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
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
