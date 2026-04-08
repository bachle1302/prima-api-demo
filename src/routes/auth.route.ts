import { Router } from "express";
import { loginUser, logout, logoutAll, refreshToken, registerUser } from "../controllers/authUser.controller";
import { authMiddleware } from '../middlewares/auth.middlewares';
import { validate } from "../middlewares/validate.middleware";
import { registerSchema, loginSchema } from "../validations/auth.validation";

const router =Router();
router.post('/register',validate(registerSchema), registerUser);
router.post('/login',validate(loginSchema), loginUser);
router.post('/logout', logout);
router.post('/refresh-token', refreshToken);
router.post('/logoutAll', authMiddleware, logoutAll);
export default router;