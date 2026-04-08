import { AuthRequest } from '../middlewares/auth.middlewares';
import * as userService from '../services/user.service';
import { Response } from 'express';

export const getMe = async (req: AuthRequest, res: Response) => {
    const user = await userService.getMe(Number(req.userId));
    res.json(user);
};
