
import { FaTrash } from 'react-icons/fa'
import { Link } from 'react-router-dom'

type CartItemProps = {
  cartItem:any
}

const CartItem = ({cartItem}:CartItemProps) => {
        const {productId,photo,name,price,quantity}= cartItem
  return (
    <div className='cart-item p-[2rem] flex justify-center items-center gap-[4rem]' >
      <img className='h-[10rem] w-[10rem] object-contain ' src={photo} alt={name} />
      <article className='flex flex-col items-start justify-center ' >
        <Link className='text-[1.2rem] text-[rgb(46,46,46)] hover:text-blue-400'  to={`/product/${productId}`} >{name}</Link>
        <span className='font-[700]' >₹{price}</span>
      </article>
      <div className='ml-auto flex justify-center items-center gap-1  ' >
        <button className='w-[2rem] h-[2rem] flex justify-center items-center gap-1 hover:bg-black hover:text-white rounded-[5px] cursor-pointer text-[1.2rem] ' >-</button>
        <p>{quantity}</p>
        <button className='w-[2rem] h-[2rem] flex justify-center items-center gap-1 hover:bg-black hover:text-white rounded-[5px] cursor-pointer text-[1.2rem] ' >+</button>
        
      </div>
      <button className='bg-transparent flex justify-center items-center gap-1 cursor-pointer hover:text-red-500  ' ><FaTrash /></button>
    </div>
  )
}

export default CartItem