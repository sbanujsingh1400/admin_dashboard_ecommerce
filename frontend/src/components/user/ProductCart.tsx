import { CartItem } from "@/redux/types/types"
import { FaPlus } from "react-icons/fa"

type ProductsProps = {
    productId:string,
    photo:string,
    name:string,
    price:number,
    stock:number,
    handler:(cartItem:CartItem)=>string| undefined
}

const ProductCart = ({productId,photo,name,price,stock,handler}:ProductsProps) => {

     const cartItem:CartItem = {
      productId,
      name,
      price,
      stock,
      photo,
      quantity:1
     }
  return (
    <div className="product-card group relative w-[18.7rem] bg-white h-[25rem] p-[1rem] flex flex-col items-center gap-[4px] justify-start" >
        <img className=" h-[calc(18.75rem-3rem)] w-[calc(18.75rem-3rem)] object-cover m-[1rem] " src={`${photo}`} alt={name} />
        <p>{name}</p>
        <span className="font-[700] text-[1.1rem]" >₹{price}</span>
        <div className=" opacity-0 group-hover:opacity-100 h-[100%] text-white  top-0 left-0 w-[100%] absolute bg-[#0000006b] justify-center items-center flex ">
            <button className=" flex h-[3rem] w-[3rem] bg-blue-400  rounded-full justify-center items-center hover:rotate-[20deg]" onClick={()=>handler(cartItem)} ><FaPlus /></button>
        </div>
    </div>
  )
}

export default ProductCart