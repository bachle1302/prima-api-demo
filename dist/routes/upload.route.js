"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_middlewares_1 = require("./../middlewares/auth.middlewares");
const express_1 = __importDefault(require("express"));
const upload_controller_1 = require("../controllers/upload.controller");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const router = express_1.default.Router();
router.post("/upload", auth_middlewares_1.authMiddleware, upload_middleware_1.upload.single("file"), upload_controller_1.uploadImage);
exports.default = router;
