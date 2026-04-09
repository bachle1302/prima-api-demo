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

// Danh sách các domain được phép truy cập
const allowedOrigins = [
  'http://localhost:3000',
  'https://prima-fe-demo.vercel.app',
];

app.use(morgan('dev'));

app.use(cors({
  origin: function (origin, callback) {
    // Cho phép các request không có origin (như Postman hoặc các công cụ server-to-server)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.includes(origin) || 
                     origin.endsWith('.vercel.app'); // Cho phép tất cả sub-domain của Vercel

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log("CORS blocked for origin:", origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['set-cookie']
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