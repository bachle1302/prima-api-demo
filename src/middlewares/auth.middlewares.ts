import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthRequest extends Request {
    userId?: number;
    role?: string;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Missing token' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
            userId: number;
            role: string;
        };


        req.userId = decoded.userId;
        req.role = decoded.role;
        next();
    } catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};
