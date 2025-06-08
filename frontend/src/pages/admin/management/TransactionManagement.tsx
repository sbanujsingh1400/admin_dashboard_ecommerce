import React, { useEffect, useState } from 'react'
import AdminSidebar from '../components/AdminSidebar'
import type { OrderItemType, OrderType } from '../../../types'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from '@/redux/api/orderApi'
import { useSelector } from 'react-redux'
import { responseToast } from '@/utils/features'
import { FaTrash } from 'react-icons/fa'



const orderItems =[ {
    name : 'Puma Shoes',
    photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwUIq4sq5TVMfsBN7rgHQ_NbI2dhKhrzAenw&s',
    price:2000,
    quantity:4,
    _id:'sdf'
    
}]

const TransactionManagement = () => {
    
    const {id} = useParams();
    const navigate = useNavigate()
    const {user} = useSelector((state:any)=>state.userReducer);
    const {isError,isLoading,data:api ,error}= useOrderDetailsQuery(id!)
    const [updateOrder] = useUpdateOrderMutation()
    const [deleteOrder] = useDeleteOrderMutation()

const [order, setOrder] = useState<OrderType>({
    name:"",
    address:'',
    city:'',
    state:'',
    country:'',
    pinCode:461001,
    status:'Processing',
    subtotal:40000,
    discount:1200,
    shippingCharges:0,
    tax:200,
    total:4000+200+0-1200,
    orderItems:orderItems,
    _id:''

})

const {name,address,city,state,country,pinCode,status,subtotal,discount,shippingCharges,tax,total,_id} = order
const updateHandler = async ()=>{

       const res= await updateOrder({userId:user._id,orderId:id!})
    // setOrder((prev)=>({...prev,status: prev.status==='Processing'? 'Shipped':'Delivered'}))
    responseToast(res,navigate,'/admin/transaction')
}
 
const deleteHandler = async ()=>{

    const res= await deleteOrder({userId:user._id,orderId:id!})
 // setOrder((prev)=>({...prev,status: prev.status==='Processing'? 'Shipped':'Delivered'}))
 responseToast(res,navigate,'/admin/transaction')
}
useEffect(()=>{
    const order=api?.order
    console.log(order)
    const orderDetails: OrderType = {
        name: order?.user?.name ?? '',
        address: order?.shippingInfo?.address ?? '',
        city: order?.shippingInfo?.city ?? '',
        state: order?.shippingInfo?.state ?? '',
        country: order?.shippingInfo?.country ?? '',
        // @ts-ignore
        pinCode: order?.shippingInfo?.pincode ?? 0,
        // @ts-ignore
        status: order?.status ,
        subtotal: order?.subtotal ?? 0,
        discount: order?.discount ?? 0,
        shippingCharges: order?.shippingCharges ?? 0,
        tax: order?.tax ?? 0,
        total: (order?.subtotal ?? 0) + (order?.tax ?? 0) + (order?.shippingCharges ?? 0) - (order?.discount ?? 0),
        orderItems: order?.orderItems ?? [],
        _id: order?._id ?? '',
      };

    setOrder(orderDetails)

   },[api])

    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main className='product-management' >
                <section style={{padding:'2rem'}} >
                    <h2>Order Items</h2>
                    {order.orderItems.map((i,idx)=>(<ProductCard key={i._id} name={i.name} photo={i.photo} price={i.price} quantity={i.quantity} _id={i._id} deleteHandler={deleteHandler} />))}
                </section>
                <article className='shipping-info-card' >
                    <h1>Order Info</h1>
                    <h5>User Info</h5>
                    <p>Name : {name}</p>
                    <p>Address : {address},{city},{state},{country},{pinCode}</p>
                    <p>Amount Info</p>
                    <p>Subtotal : {subtotal}</p>
                    <p>Shipping Charges : {shippingCharges}</p>
                    <p>Tax : {tax}</p>
                    <p>Discount : {discount}</p>
                    <p>Total : {total}</p>
                    <p>Status <span className={status=='Delivered'?'purple': status==='Processing'?'red':'green'} >{status}</span></p>
                    <button className='manage-button'  onClick={updateHandler} >Process Status</button>
                </article>
            </main>
        </div>
      )
    }

    const ProductCard = ({ name, photo, price, quantity, _id,deleteHandler }: OrderItemType) => (
        <div className="transaction-product-card">
          <img src={photo} alt={name} />
          <Link to={`/product/${_id}`}>{name}</Link>
          <span>
            ${price} X {quantity} = ${price * quantity}
          </span>
          <div onClick={deleteHandler} ><FaTrash /></div>
        </div>
      );
export default TransactionManagement