"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutAll = exports.logout = exports.refreshToken = exports.loginUser = exports.registerUser = void 0;
const catchAsync_1 = require("../utils/catchAsync");
const authService = __importStar(require("./../services/auth.service"));
exports.registerUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
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
exports.loginUser = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const { email, password } = req.body;
    const userAgent = req.headers['user-agent'] || 'unknown';
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    if (!email || !password) {
        return res.status(400).json({ message: 'Missing fields' });
    }
    const { accessToken, refreshToken } = await authService.loginUser(email, password, userAgent, ip);
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        // Sửa thành 'none' để hỗ trợ gọi API xuyên domain/port trên HTTPS
        sameSite: 'none',
        path: '/',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    res.status(200).json({ accessToken });
});
exports.refreshToken = (0, catchAsync_1.catchAsync)(async (req, res) => {
    const token = req.cookies.refreshToken;
    console.log('kiểm tra có token k: ', token);
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const { accessToken, refreshToken } = await authService.refreshTokenService(token);
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            // Sửa thành 'none' để hỗ trợ gọi API xuyên domain/port trên HTTPS
            sameSite: 'none',
            path: '/',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.status(200).json({ accessToken: accessToken });
    }
    catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
});
exports.logout = (0, catchAsync_1.catchAsync)(async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if (token) {
            await authService.logout(token);
        }
        res.clearCookie('refreshToken');
        return res.json({ message: 'Logged out' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
exports.logoutAll = (0, catchAsync_1.catchAsync)(async (req, res) => {
    try {
        const userId = req.userId;
        console.log('User ID for logoutAll:', userId);
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        await authService.logoutAll(userId);
        res.clearCookie('refreshToken');
        return res.json({ message: 'Logged out from all devices' });
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
});
