import express, { json, NextFunction, Request, Response } from 'express'
import { ErrorHandler } from '../utils/errorHandler';
import { ControllerType } from '../types/types';
export const errorMiddleware  = (err:ErrorHandler,req:Request,res:Response,next:NextFunction):any=>{
    err.message ||= "Internal Server Error";
    err.statusCode ||= 500;
    if (err.name === "CastError") err.message = "Invalid ID";

 
    return res.status(err.statusCode).json({ success: false, message: err.message });
}


export const TryCatch = (func:ControllerType)=>{

return (req:Request,res:Response,next:NextFunction)=>{
   return  Promise.resolve(func(req,res,next)).catch(next);
}

} 
