import { Request } from "express";
import { TryCatch } from "../middlewares/error";
import { BaseQuery, NewProductRequestBody, SearchRequestQuery } from "../types/types";
import { Product } from "../models/product.model";
import { ErrorHandler } from "../utils/errorHandler";
import { rm } from "fs";
import { myCache } from "../app";
import { invalidateCache } from "../utils/features";


export const newProduct = TryCatch(async (req:Request<{},{},NewProductRequestBody>,res,next)=>{

    console.log(req.body)
    const {name,price,stock,category}=req.body
    const photo = req.file;
   if(!photo)return next(new ErrorHandler('Please Add Photo',400))
  if(!name || !price || !stock || !category)return next(new ErrorHandler('Please enter all field',400));
const product=    await Product.create({name,price,stock,category,photo:photo?.path});
   await invalidateCache({product:true});
return res.status(201).json({
    success:true,
    message:"Product Created Successfully",
    product
})

})


export const getLatestProducts = TryCatch(async (req:Request<{},{},NewProductRequestBody>,res,next)=>{
    
let products = [];
if(myCache.has('latest-product')){
    products=JSON.parse(myCache.get('latest-products') as string )
}else{
    products = await Product.find({}).sort({createdAt:-1}).limit(5);
    myCache.set("latest-product",JSON.stringify(products));

}return res.status(200).json({
    success:true,
    message:"Product Created Successfully",
    products
})

})



export const getAllCategories = TryCatch(async (req:Request<{},{},NewProductRequestBody>,res,next)=>{

    const products = await Product.distinct('category')
  
return res.status(200).json({
    success:true,
    message:"Product Created Successfully",
    products
})

})



export const getAdminProducts = TryCatch(async (req:Request<{},{},NewProductRequestBody>,res,next)=>{

    const products = await Product.find({});
  
return res.status(200).json({
    success:true,
    message:"Product Created Successfully",
    products
})

})


export const getSingleProduct = TryCatch(async (req,res,next)=>{

    const products = await Product.findById(req.params.id);
  
return res.status(200).json({
    success:true,
    message:"Product Created Successfully",
    products
})

})


export const updateProduct = TryCatch(async (req,res,next)=>{

     const {id} = req.params;
      
    const {name,price,stock,category}=req.body
    const photo = req.file;
    const product = await Product.findById(id);
    if(!product)return next(new ErrorHandler('Invalid Product ID',404));
//    if(photo){
//     rm(product.photos[0])
//    }
   if(name) product.name=name;
   if(price) product.price=price;
   if(stock) product.stock=stock;
   if(category) product.category=category;

    await product.save();
return res.status(201).json({
    success:true,
    message:"Product UPDATED Successfully",
    product
})

})


export const deleteProduct = TryCatch(async (req,res,next)=>{

    const product = await Product.findById(req.params.id);
    if(!product)return next(new ErrorHandler('Product not found',404));

    await Product.deleteOne();
  
return res.status(200).json({
    success:true,
    message:"Product Deleted Successfully",
    
})

})



export const getAllProducts = TryCatch(async (req:Request<{},{},{},SearchRequestQuery>,res,next)=>{

    const {search,sort,category,price}=req.query;
    const page = Number(req.query.page);
    const limmit = process.env.PRODUCT_PER_PAGE;
    const baseQuery:BaseQuery= {
       
        // price:{
        //     $lte:Number(price),
        // },
        // category,
    };

    if(search){
      baseQuery.name={$regex:search,$options:'i'};  
    }

    if(price){
        baseQuery.price={$lte:Number(price)};  
      }
      if(category){
        baseQuery.category=category;  
      }
    const products = await Product.find({baseQuery}).sort(sort?{price:sort==='asc'?1:-1}:undefined);
    
return res.status(200).json({
    success:true,
    message:"Product Created Successfully",
    products
})

})





