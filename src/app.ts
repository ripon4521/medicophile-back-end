
import express, { Request, Response } from 'express'
import userRouter from './module/user/user.router'
import authRouter from './module/auth/auth.router'
import blogRouter from './module/blog/blog.router'
import { globalErrorHandler } from './middlewares/globalErrorHandler'
import adminRouter from './module/admin/admin.router'
import notFound from './middlewares/notFound'
import { ProductRoutes } from './module/product/product.routes'
import { OrderRoutes } from './module/order/order.routes'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { CategoryRoutes } from './module/category/category.routes'
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
app.use('/api/blogs', blogRouter)
app.use('/api/products', ProductRoutes)
app.use('/api/order', auth(USER_ROLE?.user, USER_ROLE.admin), OrderRoutes)
app.use('/api/categorys', CategoryRoutes)


app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Hello',
  })
})


app.use(globalErrorHandler)
app.use(notFound)



export default app
