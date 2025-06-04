import express, { Request }  from 'express'
import { adminOnly } from '../middlewares/auth';
import { allOrders, deleteOrder, getSingleOrder, myOrders, newOrder, processOrder } from '../controllers/orders.controller';

const app = express.Router();


app.post("/new",(req,res,next)=>{
    newOrder(req,res,next);
})

app.get("/my",(req,res,next)=>{
    myOrders(req,res,next);
})


app.get("/all",(req,res,next)=>{adminOnly(req,res,next)},(req,res,next)=>{
    allOrders(req,res,next);
})

app.route('/:id').get((req,res,next)=>{getSingleOrder(req,res,next)}).put((req,res,next)=>{adminOnly(req,res,next)},(req,res,next)=>{processOrder(req,res,next)}).delete((req,res,next)=>{adminOnly(req,res,next)},(req,res,next)=>{deleteOrder(req,res,next)})
export default app;