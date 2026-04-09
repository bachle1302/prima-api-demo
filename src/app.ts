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

// 1. Logger nên đặt đầu tiên
app.use(morgan('dev'));

// 2. Cấu hình CORS chuẩn
const allowedOrigins = [
  'http://localhost:3001', 
  'http://localhost:3000', // Thêm 3000 nếu bạn dùng cả 2 port
  'https://31jkf0n8-3001.asse.devtunnels.ms'
];

app.use(cors({
  origin: function (origin, callback) {
    // Cho phép các origin trong danh sách hoặc không có origin (như Postman/Mobile app)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Quan trọng để trao đổi Cookie
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}));

// 3. Xử lý phản hồi cho request OPTIONS (Preflight)
app.options('*', cors()); 

// 4. Các middleware hỗ trợ dữ liệu
app.use(express.json());
app.use(cookieParser());

// 5. Middleware theo dõi request (đã bỏ '/' dư thừa để gọn hơn)
app.use((req, res, next) => {
  console.log(`[Request]: ${req.method} ${req.path}`);
  next();
});

// 6. Routes
app.use('/api/auth', authRouter)
app.use('/api/users', userRouter)
app.use('/api', uploadRouter)
app.use("/api", comicRoute);

// Home route để tránh 404 khi Render kiểm tra Health Check
app.get("/", (req, res) => {
  res.status(200).send("API is running...");
});

// 7. Error Handler luôn đặt cuối cùng
app.use(errorHandler);

export default app