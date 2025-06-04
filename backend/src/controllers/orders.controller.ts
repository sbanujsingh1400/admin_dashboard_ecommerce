import { NextFunction, Request, Response } from "express";
import { TryCatch } from "../middlewares/error";
import { NewOrderRequestBody } from "../types/types";
import { Orders } from "../models/order.model";
import { invalidateCache, reduceStock } from "../utils/features";
import { ErrorHandler } from "../utils/errorHandler";
import { myCache } from "../app";


export const newOrder = TryCatch(async(req:Request<{},{},NewOrderRequestBody>,res:Response,next:NextFunction)=>{


    const {shippingInfo,orderItems,user,subtotal,tax,shippingCharges,discount,total} = req.body;
    if(!shippingInfo || !orderItems || !user || !subtotal || !tax || !shippingCharges || !discount || !total )return next(new ErrorHandler('Please enter all field',400));
    const order =await Orders.create({shippingInfo,orderItems,user,subtotal,tax,shippingCharges,discount,total});
   await  reduceStock(orderItems);

   await invalidateCache({product:true});

   return res.status(201).json({message:"Order Placed Successfully",order,success:true})


})


export const myOrders = TryCatch(async(req:Request,res:Response,next:NextFunction)=>{


   const {id}=req.query;
   let orders = [];

   if(myCache.has(''))orders= JSON.parse(myCache.get('') as string);
   else {
    orders = await Orders.find({user:id});

    myCache.set("",JSON.stringify(orders))
   }
return res.status(201).json({
    success:true,
    message:"Order fetched Successfully"
})

})


export const allOrders = TryCatch(async (req,res,next)=>{

    const {id}=req.query;
    let orders = [];

    orders = await Orders.find({}).populate('user',"name");

    return res.status(201).json({
        success:true,
        message:"Order fetched Successfully"
    })
    


})


export const getSingleOrder = TryCatch(async (req,res,next)=>{

    const {id}=req.params;
    let orders = [];

    orders = await Orders.find({_id:id}).populate('user',"name");
   if(!orders)return next(new ErrorHandler("Order not found",404))
    return res.status(201).json({
        success:true,
        message:"Order fetched Successfully"
    })
    


})


export const processOrder = TryCatch(async(req:Request,res:Response,next:NextFunction)=>{


        const {id}= req.params;
const order =await Orders.findById(id);

if(!order)return res.status(404).json({message:"Order Not Found",order,success:false});

switch (order.status) {
    case "Processing":
        order.status="Shipped"
        break;

    case "Shipped":
        order.status="Delivered"
        break;

    
    default:
        order.status="Delivered"
        break;
}

await order.save();


   return res.status(201).json({message:"Order Placed Successfully",order,success:true})


})



export const deleteOrder = TryCatch(async (req,res,next)=>{

    const {id}=req.params;
    

   const order = await Orders.findById(id).populate('user',"name");
   if(!order)return next(new ErrorHandler("Order not found",404))
   await order.deleteOne();
    return res.status(201).json({
        success:true,
        message:"Order deleted  Successfully"
    })
    


})