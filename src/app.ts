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
  origin: '*', // Cho phép tất cả các trang web truy cập vào API này
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
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