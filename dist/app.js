"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const upload_route_1 = __importDefault(require("./routes/upload.route"));
const comic_route_1 = __importDefault(require("./routes/comic.route"));
const error_middleware_1 = require("./middlewares/error.middleware");
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use((0, cors_1.default)({
    // Cho phép origin của Frontend
    origin: 'http://localhost:3001',
    // Cho phép gửi kèm Cookie (quan trọng cho Refresh Token)
    credentials: true,
    // Các phương thức được phép
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // Các Header được phép gửi lên
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use('/', (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
app.use('/api/auth', auth_route_1.default);
app.use('/api/users', user_route_1.default);
app.use('/api', upload_route_1.default);
app.use("/api", comic_route_1.default);
app.use(error_middleware_1.errorHandler);
exports.default = app;
