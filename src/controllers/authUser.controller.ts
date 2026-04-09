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
        httpOnly: true,
        secure: true,
        // Sửa thành 'none' để hỗ trợ gọi API xuyên domain/port trên HTTPS
        sameSite: 'none',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.status(200).json({ accessToken, refreshToken });
});

export const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const token = req.cookies.refreshToken;
    console.log('kiểm tra có token k: ', token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const { accessToken, refreshToken } =
            await authService.refreshTokenService(token);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            // Sửa thành 'none' để hỗ trợ gọi API xuyên domain/port trên HTTPS
            sameSite: 'none',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});
export const logout = catchAsync(async (req: Request, res: Response) => {
    try {
        const token = req.cookies.refreshToken;

        if (token) {
            await authService.logout(token);
        }

        res.clearCookie('refreshToken');

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

        res.clearCookie('refreshToken');

        return res.json({ message: 'Logged out from all devices' });
    } catch (err: any) {
        return res.status(500).json({ message: err.message });
    }
});
