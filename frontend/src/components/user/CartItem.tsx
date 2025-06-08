
import { calculatePrice, decreaseCartItems, increaseCartItems, removeCartItems } from '@/redux/reducer/cartReducer'
import {  CartItem as CartItemType } from '@/redux/types/types'
import { FaTrash } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

type CartItemProps = {
  cartItem:CartItemType,
  // decrementHandler:(cartItem:CartItemType)=>void,
  // incrementHandler:(cartItem:CartItemType)=>void
  // removeHandler:(id:string)=>void
}


const CartItem = ({cartItem}:CartItemProps) => {
           
        const {productId,photo,name,price,quantity}= cartItem
//  console.log(cartItem)
        const dispatch =useDispatch()
        
  const incrementHandler= ()=>{
    dispatch(increaseCartItems(cartItem))

  }
  const decrementHandler= ()=>{
    dispatch(decreaseCartItems(cartItem))
  }
  const removeHandler= ()=>{
    dispatch(removeCartItems(cartItem))
    
  }

        
  return (
    <div className='cart-item p-[2rem] flex justify-center items-center gap-[4rem]' >
      <img className='h-[10rem] w-[10rem] object-contain ' src={photo} alt={name} />
      <article className='flex flex-col items-start justify-center ' >
        <Link className='text-[1.2rem] text-[rgb(46,46,46)] hover:text-blue-400'  to={`/product/${productId}`} >{name}</Link>
        <span className='font-[700]' >₹{price}</span>
      </article>
      <div className='ml-auto flex justify-center items-center gap-1  ' >
        <button className='w-[2rem] h-[2rem] flex justify-center items-center gap-1 hover:bg-black hover:text-white rounded-[5px] cursor-pointer text-[1.2rem] ' onClick={decrementHandler}  >-</button>
        <p>{quantity}</p>
        <button className='w-[2rem] h-[2rem] flex justify-center items-center gap-1 hover:bg-black hover:text-white rounded-[5px] cursor-pointer text-[1.2rem] '  onClick={incrementHandler} >+</button>
        
      </div>
      <button className='bg-transparent flex justify-center items-center gap-1 cursor-pointer hover:text-red-500  '  onClick={removeHandler} ><FaTrash /></button>
    </div>
  )
}

export default CartItem