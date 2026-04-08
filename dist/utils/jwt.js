"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.signRefreshToken = exports.signAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const signAccessToken = (user) => {
    const userId = user.userId || user.id;
    return jsonwebtoken_1.default.sign({ userId, role: user.role }, JWT_SECRET, {
        expiresIn: '15m'
    });
};
exports.signAccessToken = signAccessToken;
// do khi đăng nhập dùng bảng có cột là id nên khi tạo token sẽ lấy trường id và token gán thành userId, nên khi gọi lại hàm signRefreshToken cũng phải lấy trường id để tạo token mới, nếu không sẽ bị lỗi khi giải mã token cũ vì trong payload không có trường userId
//thì cần phải kiểm tra thành trường userId nếu có thì lấy userId, nếu không có thì lấy id để tạo token mới
const signRefreshToken = (user) => {
    const userId = user.userId || user.id;
    return jsonwebtoken_1.default.sign({ userId, role: user.role }, JWT_REFRESH_SECRET, {
        expiresIn: '7d'
    });
};
exports.signRefreshToken = signRefreshToken;
const verifyRefreshToken = (token) => {
    return jsonwebtoken_1.default.verify(token, JWT_REFRESH_SECRET);
};
exports.verifyRefreshToken = verifyRefreshToken;
