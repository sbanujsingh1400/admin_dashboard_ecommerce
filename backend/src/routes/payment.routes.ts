import express, { Request }  from 'express'

import { adminOnly } from '../middlewares/auth';
import { allCoupons, applyDiscount, createPayment, deleteCoupon, newCoupon } from '../controllers/payment.controller';

const app = express.Router();

app.post("/create",(req,res,next)=>{adminOnly(req,res,next)},(req,res,next)=>{
   createPayment(req,res,next);
})

app.post("/coupon/new",(req,res,next)=>{adminOnly(req,res,next)},(req,res,next)=>{
   newCoupon(req,res,next);
})

app.get("/discount",(req,res,next)=>{
    applyDiscount(req,res,next);
 })

 app.get("/coupon/all",(req,res,next)=>{adminOnly(req,res,next)},(req,res,next)=>{
    allCoupons(req,res,next);
 })
 app.delete('/coupon/:id',(req,res,next)=>{adminOnly(req,res,next)},(req,res,next)=>{deleteCoupon(req,res,next)},)

export default app;