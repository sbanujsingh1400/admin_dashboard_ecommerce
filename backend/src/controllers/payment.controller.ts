import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import { Coupon } from "../models/coupon.model";
import { stripe } from "../app";



export const createPayment = TryCatch(async (req:Request,res:Response,next:NextFunction)=>{


    const {amount}= req.body;
    if(  !amount)return res.status(403).json({message:"bad request ",success:"false"})
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount:343,
        currency:"inr"
      })

    return res.status(201).json({clientSecret:paymentIntent.client_secret,success:"true"})
    
    })



export const newCoupon = TryCatch(async (req:Request,res:Response,next:NextFunction)=>{


const {coupon,amount}= req.body;
if(!coupon || !amount)return res.status(403).json({message:"bad request ",success:"false"})
await Coupon.create({
    code:coupon,amount
})

return res.status(201).json({message:"Coupon Created ",success:"true"})

})


export const applyDiscount = TryCatch(async (req:Request,res:Response,next:NextFunction)=>{


    const {coupon}= req.query;

    const discount = await Coupon.findOne({code:coupon});
    if(!discount)return res.status(403).json({message:"Invalid Coupon ",success:"false"});

    return res.status(201).json({message:"discount has been applied  ",success:"true",discount})
    
    })


    export const allCoupons = TryCatch(async (req:Request,res:Response,next:NextFunction)=>{


           const coupons = await Coupon.find({});
    
        
        if(!coupons)return res.status(404).json({message:" Coupon not found ",success:"false"});
    
        return res.status(201).json({message:"Coupon found  ",success:"true",coupons})
        
        })


        
        
        export const deleteCoupon = TryCatch(async (req:Request,res:Response,next:NextFunction)=>{
   
             const id =req.params.id;
            const coupons = await Coupon.find({id}).deleteOne();
     
         
         if(!coupons)return res.status(404).json({message:" Coupon not found ",success:"false"});
     
         return res.status(201).json({message:"Coupon deleted successfully  ",success:"true",coupons})
         
         })
 
 
         
         
 