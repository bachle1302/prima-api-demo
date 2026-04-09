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
  // Cho phép origin của Frontend
  origin: 'http://localhost:3000', 
  
  // Cho phép gửi kèm Cookie (quan trọng cho Refresh Token)
  credentials: true, 
  
  // Các phương thức được phép
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  
  // Các Header được phép gửi lên
  allowedHeaders: ['Content-Type', 'Authorization']
}));

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