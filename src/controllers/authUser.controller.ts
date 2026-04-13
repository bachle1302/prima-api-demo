import { AuthRequest } from '../middlewares/auth.middlewares';
import { catchAsync } from '../utils/catchAsync';
import * as authService from './../services/auth.service';
import { Request, Response } from 'express';

export const registerUser = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    const user = await authService.registerUser(email, password);
    res.status(201).json({
        message: 'User registered successfully',
        user
    });
});

const cookieOptions: import('express').CookieOptions = {
    httpOnly: true,
    secure: true, // luôn true để cookie cross-domain hoạt động (sameSite: 'none' cần secure: true)
    sameSite: 'none',
    path: '/'
};

export const loginUser = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const userAgent = req.headers['user-agent'] || 'unknown';
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    const { accessToken, refreshToken } = await authService.loginUser(
        email,
        password,
        userAgent,
        ip
    );
    res.cookie('refreshToken', refreshToken, {
        ...cookieOptions,
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.status(200).json({ accessToken, refreshToken });
});

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    console.log('=== REFRESH TOKEN ENDPOINT ===');
    console.log('Received token from cookie:', token);

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const { accessToken } = await authService.refreshTokenService(token);

        res.status(200).json({
            accessToken: accessToken        });
    } catch (error: any) {
        if (error.message === 'Token has been revoked or is invalid' || error.message === 'Invalid or expired refresh token') {
            // Xóa cookie ở trình duyệt
            res.clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                path: '/' // Đảm bảo đúng path lúc set cookie
            });
            
            return res.status(401).json({ message: 'Session expired, please login again' });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
});
export const logout = catchAsync(async (req: Request, res: Response) => {
    try {
        const token = req.cookies.refreshToken;

        if (token) {
            await authService.logout(token);
        }

        res.clearCookie('refreshToken', cookieOptions);

        return res.json({ message: 'Logged out' });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
});

export const logoutAll = catchAsync(async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;
        console.log('User ID for logoutAll:', userId);
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await authService.logoutAll(userId);

        res.clearCookie('refreshToken', cookieOptions);

        return res.json({ message: 'Logged out from all devices' });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
});
