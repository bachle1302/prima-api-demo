"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middlewares_1 = require("../middlewares/auth.middlewares");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
router.get('/me', auth_middlewares_1.authMiddleware, (0, role_middleware_1.authorize)(['USER']), user_controller_1.getMe);
exports.default = router;
