"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const authorize = (roles) => {
    return (req, res, next) => {
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
exports.authorize = authorize;
