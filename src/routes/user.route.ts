import { Router } from 'express';
import { getMe } from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/auth.middlewares';
import { authorize } from '../middlewares/role.middleware';

const router = Router();

router.get('/me', authMiddleware, authorize(['USER']), getMe);
export default router;
