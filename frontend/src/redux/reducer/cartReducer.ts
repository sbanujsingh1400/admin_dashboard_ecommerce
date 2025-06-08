import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import { CartReducerInitialState } from "../types/reducer-types";
import { CartItem } from "../types/types";

const initialState :CartReducerInitialState = {
    loading:false,
    cartItems:[],
    subtotal:0,
    tax:0,
    shippingCharges:0,
    discount:0,
    total:0,
    shippingInfo:{
        address:'',
        city:'',
        state:'',
        pinCode:'',
        country:''
    },
    coupon:""
};


export const cartReducer = createSlice({
    name:'cartReducer',
    initialState,
    reducers:{
       addToCart :(state,action:PayloadAction<CartItem>)=>{
        state.loading=true;
        
const index = state.cartItems.findIndex(i=>i.productId==action.payload.productId);

if(index!=-1){
     state.cartItems[index].price+=action.payload.price;
     state.cartItems[index].quantity+=action.payload.quantity;
    //  state.cartItems[index].price+=action.payload.quantity;

}else {
        state.cartItems.push(action.payload);
    }
        state.loading=false;

       } ,
       removeCartItems :(state,action:PayloadAction<CartItem>)=>{
        state.loading=true;
        state.cartItems=state.cartItems.filter((i)=>i.productId!==action.payload.productId)
        state.loading=false;
        
       } ,
       increaseCartItems :(state,action:PayloadAction<CartItem>)=>{
        state.loading=true;
        
        const index = state.cartItems.findIndex(i=>i.productId==action.payload.productId);
        
        if(index!=-1){
             state.cartItems[index].price+=action.payload.price/action.payload.quantity;
             state.cartItems[index].quantity+=1;
            //  state.cartItems[index].price+=action.payload.quantity;
        
        }else {
                // state.cartItems.push(action.payload);
            }
                state.loading=false;
       } ,
       decreaseCartItems :(state,action:PayloadAction<CartItem>)=>{
        state.loading=true;
        
        const index = state.cartItems.findIndex(i=>i.productId==action.payload.productId);
        
        if(index!=-1){

             state.cartItems[index].price-=action.payload.price/action.payload.quantity;
             state.cartItems[index].quantity-=1;
            //  state.cartItems[index].price+=action.payload.quantity;
        
        }else {
                // state.cartItems.push(action.payload);
            }
                state.loading=false;
        
       } ,
       calculatePrice:(state)=>{
     state.subtotal=state.cartItems.reduce((subtotal,item)=>{return subtotal+item.price*item.quantity},0);
           state.shippingCharges=state.subtotal>1000 ?0:200;
           state.tax = Math.round(state.subtotal*0.18);
           state.total= state.tax+state.shippingCharges+state.subtotal;

       },
       saveShippingInfo:(state,action)=>{
        state.shippingInfo=action.payload
       },
       resetCart:()=>initialState
       
    }
})

export const {addToCart,removeCartItems,decreaseCartItems,increaseCartItems,calculatePrice,saveShippingInfo,resetCart}= cartReducer.actions