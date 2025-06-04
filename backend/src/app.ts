import express from 'express'
import dotenv from 'dotenv'
import userRouter from './routes/user.routes';
import dashboardRouter from './routes/stats.routes';
import paymentRouter from './routes/payment.routes';
import productRouter from './routes/products.routes';
import orderRouter from './routes/orders.routes';
import { connectDB } from './utils/features';
import { errorMiddleware } from './middlewares/error';
import NodeCache from 'node-cache';
import morgan from 'morgan';
import Stripe from 'stripe';
dotenv.config();
const port = process.env.PORT || 3001
const stripeKey = process.env.STRIPE_KEY || ""


export const stripe = new Stripe(stripeKey)
export const myCache= new NodeCache();
const app = express();
connectDB()
app.use(express.json());
app.use(morgan('dev'));


app.use('/api/v1/dashboard',dashboardRouter); 
app.use('/api/v1/payment',paymentRouter); 
app.use('/api/v1/order',orderRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/user',userRouter);
app.get('/',(req:any ,res:any)=>{return res.json({"lala":"lala"})})

app.use(errorMiddleware)

app.listen(port, ()=>{console.log('Server is listening to '+port)})
