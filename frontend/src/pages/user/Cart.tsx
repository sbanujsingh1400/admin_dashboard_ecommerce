import CartItem from '@/components/user/CartItem';
import { calculatePrice } from '@/redux/reducer/cartReducer';
import { CartReducerInitialState } from '@/redux/types/reducer-types';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { VscError } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


// const shippingCharges = 200;
// const discount = 200;
// const total = subtotal+tax+shippingCharges;;
type CartItemProps = {
  cartItem:any
}
// const cartItem1 = {productId:'anuthing',photo:"https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/186x116---wm._SY116_CB667322346_.jpg",name:'anuthing',price:'anuthing',stock:'anuthing',quantity:'anuthing'}


const Cart = () => {

   const {cartItems,subtotal,tax,total,shippingCharges,discount}= useSelector((state:{cartReducer:CartReducerInitialState})=>state.cartReducer)
  const [couponCode,setCouponCode]= useState<string>('');
  const [isValidCouponCode,setIsValidCouponCode]= useState<boolean>(true);
  const [amount,setAmount]= useState<number>();
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(calculatePrice());
  },[cartItems])
 
 useEffect(() => {
    
  const timeOutId = setTimeout(()=>{
    
    axios.get(`http://localhost:3001/api/v1/payment/discount?coupon=${couponCode}`).then((res)=>{
    // console.log(res)  
    setAmount(Number(res.data.discount.amount))
    setIsValidCouponCode(true);

    }).catch((err=>{
      // console.log(err)
      setIsValidCouponCode(false);
    }))

  },1000)
 
   return () => {
     clearTimeout(timeOutId)
   }
 }, [couponCode])
 


  return (
    <div className='cart flex justify-between items-center gap-[4rem] h-[calc(100vh-4rem)] px-[2rem] py-[4rem]'>
      <main className='w-[70%] overflow-y-auto hide-scrollbar  ' >
        {cartItems.length>0 &&cartItems.map(item=><CartItem cartItem={item} />) }
        { cartItems.length<=0 &&<h1>No Items Added</h1>}
      </main>
      <aside className='w-[30%] p-[4rem] flex flex-col justify-center items-stretch gap-[1.5] ' >
        <p className='text-[1.1rem]' >Subtotal:₹{subtotal}</p>
        <p className='text-[1.1rem]' >Shipping Charge:₹{shippingCharges}</p>
        <p className='text-[1.1rem]' >Tax:₹{tax}</p>
        <p className='text-[1.1rem]' >Discount :<em className='text-red-400' >₹{discount}</em> </p>
        <p className='text-[1.1rem]' >Total :<em className='text-red-400' >₹{total}</em> </p>
        <input type="text" className='p-[0.2rem] focus:outline-none rounded-[5px] mt-[2rem]  border-[2px] border-solid border-black' value={couponCode} onChange={(e)=>{setCouponCode(e.target.value)}} placeholder='Coupon Code' />
          {couponCode && (isValidCouponCode?<span className='text-green-300 flex items-center justify-center gap-[5px] mt-[1rem] ' >₹{amount} off using the <code className='font-[900]  self-[flex-end] ' >{couponCode}</code></span>: <span className='text-red-600 flex items-center justify-center gap-[5px] -mt-[1rem]' >Invalid Coupon Code <VscError /></span>)}
         <Link  className='bg-blue-400 flex justify-center  p-[1rem] no-underline text-white uppercase tracking-[2px] rounded-[5px] hover:opacity-[0.8] ' to={'/shipping'} >Checkout</Link>
      </aside>
    </div>
  )
}

export default Cart