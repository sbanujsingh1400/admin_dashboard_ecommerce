import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.model";
import { NewUserRequestBody } from "../types/types";
import { TryCatch } from "../middlewares/error";
import { ErrorHandler } from "../utils/errorHandler";

export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, photo, gender, _id, dob } = req.body;

    let user = await User.findById(_id);

    if (user)
      return res.status(200).json({
        success: true,
        message: `Welcome, ${user.name}`,
      });

    if (!_id || !name || !email || !photo || !gender || !dob)
      return next(new ErrorHandler("Please add all fields", 400));

    user = await User.create({
      name,
      email,
      photo,
      gender,
      _id,
      dob: new Date(dob),
    });

    return res.status(201).json({
      success: true,
      message: `Welcome, ${user.name}`,
    });
  }
);



export const getAllUser= TryCatch( async (
  req: Request<{}, {}, NewUserRequestBody>,
  res: Response,
  next: NextFunction
)=>{

  const users = await User.find({});

  if(!users){
    new ErrorHandler("No users founf",404)
  }

  res.status(200).json({ success:true, mesage:'Users Found',users:users})

})

export const getUser= TryCatch( async (
  req: Request,
  res: Response,
  next: NextFunction
)=>{
    const {id} = req.params
    
  const user = await User.findById(id)
console.log(user)
  if(!user){
    console.log("Error")
     throw new ErrorHandler("No users found",404)
  }


  res.status(200).json({success:true,mesage:'Users Found',user:user})

  
})


export const deleteUser= TryCatch( async (
  req: Request,
  res: Response,
  next: NextFunction
)=>{
    const {id} = req.params
    
  const user = await User.findById(id)
console.log(user)
  if(!user){
    console.log("Error")
     throw new ErrorHandler("No users found",404)
  }

  await user.deleteOne();


  res.status(200).json({ success:true, mesage:'User deleted',user:user})

  
})