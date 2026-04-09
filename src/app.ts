import express from 'express'
import userRouter from './routes/user.route'
import cors from 'cors'
import authRouter from './routes/auth.route'
import cookieParser from 'cookie-parser'
import uploadRouter from './routes/upload.route'
import comicRoute from './routes/comic.route'
import { errorHandler } from './middlewares/error.middleware'
import morgan from 'morgan'
const app = express()

app.use(morgan('dev'));
app.use(cors({
  origin: function (origin, callback) {
    // 1. Nếu không có origin (như Postman, Mobile App) thì cho phép
    // 2. Nếu có origin, trả về chính origin đó để "chiều lòng" trình duyệt
    if (!origin) return callback(null, true);
    
    // Bạn có thể giới hạn danh sách tại đây nếu muốn bảo mật hơn
    // const allowedOrigins = ['http://localhost:3001', 'https://prima-api-demo.onrender.com'];
    // if (allowedOrigins.includes(origin)) return callback(null, true);

    return callback(null, true); 
  },
  credentials: true, // BẮT BUỘC để nhận/gửi Cookie
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}));

// Quan trọng: Phải có dòng này để xử lý yêu cầu kiểm tra (Preflight) của trình duyệt
app.options('*', cors());

app.use(express.json())
app.use(cookieParser());
app.use('/', (req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api', uploadRouter)
app.use("/api", comicRoute);
app.use(errorHandler);
export default app