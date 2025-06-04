import { User } from "../models/user.model";
import { ErrorHandler } from "../utils/errorHandler";
import { TryCatch } from "./error";

//middleware to makesure only admin is allowed
export const adminOnly = TryCatch(async(req,res,next)=>{
    const {id}= req.query;
    if(!id) return next(new ErrorHandler("Please login first",401));

    const user = await User.findById(id);
    if(!user)return next(new ErrorHandler("Please login first",401));

    if(user.role!=='admin')return next(new ErrorHandler("Only Admin is allowed",401));
   console.log(user.role)
      next();

})