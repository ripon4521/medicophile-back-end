
import express, { Request, Response } from 'express'
import userRouter from './module/user/user.router'
import authRouter from './module/auth/auth.router'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import adminRouter from './module/admin/admin.router'
import notFound from './middlewares/notFound'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import auth from './middlewares/auth'
import { USER_ROLE } from './module/user/user.constants'

const app = express()
//parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173', 'https://bikeshopadmin.vercel.app', 'https://bikeshopstore.vercel.app'] }));


// middleware
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)


app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Hello',
  })
})


app.use(globalErrorHandler)
app.use(notFound)



export default app
