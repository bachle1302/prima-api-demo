import { Response, NextFunction } from 'express';
import { AuthRequest } from './auth.middlewares';

export const authorize = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.role || !roles.includes(req.role)) {
            console.log('Unauthorized access attempt by user with role:', req.role);
            console.log('Required roles for this route:', roles);
            return res.status(403).json({
                message: 'Forbidden'
            });
        }

        next();
    };
};
