import mongoose, { Document } from "mongoose";
import { InvalidateCacheProps, OrderItemType } from "../types/types";
import { myCache } from "../app";
import { Product } from "../models/product.model";

export const connectDB=()=>{
    const url:string |undefined =process.env.MONGO_URL
  if(typeof url !=='undefined' )  mongoose.connect(url).then(c=>{
        console.log("DB CONNECTED");
    }).catch((e)=>console.log(e));
}



export const invalidateCache= async ({product,order,admin}:InvalidateCacheProps)=>{
    if(product){
    const productKeys:string[]=['latest-products','categoriies','all-products'];
    myCache.del(productKeys);
    }
}


export const reduceStock= async(orderItems:OrderItemType[])=>{
    for(let i=0; i<orderItems.length;i++){

        const order =orderItems[i];
        const product = await Product.findById(order.productId);
        if(!product) throw new Error("Product not found");
        product.stock -=order.quantity;
        await product.save();

    }
}


export const calculatePercentage = (thisMonth:number,lastMonth:number)=>{

    return ((thisMonth-lastMonth)/lastMonth)*100
}


interface MyDocument extends Document {
    createdAt: Date;
    discount?: number;
    total?: number;
  }
  type FuncProps = {
    length: number;
    docArr: MyDocument[];
    today: Date;
    property?: "discount" | "total";
  };
  
  export const getChartData = ({
    length,
    docArr,
    today,
    property,
  }: FuncProps) => {
    const data: number[] = new Array(length).fill(0);
  
    docArr.forEach((i) => {
      const creationDate = i.createdAt;
      const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;
  
      if (monthDiff < length) {
        if (property) {
          data[length - monthDiff - 1] += i[property]!;
        } else {
          data[length - monthDiff - 1] += 1;
        }
      }
    });
  
    return data;
  };

