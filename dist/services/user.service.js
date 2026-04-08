"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const getMe = async (userId) => {
    const user = await prisma_1.default.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            createdAt: true,
            role: true,
            refreshTokens: {
                select: {
                    token: true,
                    userAgent: true,
                    ip: true,
                    expiresAt: true,
                }
            }
        }
    });
    return user;
};
exports.getMe = getMe;
