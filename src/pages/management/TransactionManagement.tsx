import React, { useState } from 'react'
import AdminSidebar from '../../components/AdminSidebar'
import type { OrderItemType, OrderType } from '../../types'
import { Link } from 'react-router-dom'



const orderItems =[ {
    name : 'Puma Shoes',
    photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwUIq4sq5TVMfsBN7rgHQ_NbI2dhKhrzAenw&s',
    price:2000,
    quantity:4,
    _id:'sdf'
    
}]

const TransactionManagement = () => {
    
const [order, setOrder] = useState<OrderType>({
    name:"ANuj",
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
    _id:'sdfg'

})

const {name,address,city,state,country,pinCode,status,subtotal,discount,shippingCharges,tax,total,_id} = order
const updateHandler = ()=>{
    setOrder((prev)=>({...prev,status: prev.status==='Processing'? 'Shipped':'Delivered'}))
}
    return (
        <div className="adminContainer">
            <AdminSidebar />
            <main className='product-management' >
                <section style={{padding:'2rem'}} >
                    <h2>Order Items</h2>
                    {order.orderItems.map((i,idx)=>(<ProductCard name={i.name} photo={i.photo} price={i.price} quantity={i.quantity} _id={i._id} />))}
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

    const ProductCard = ({ name, photo, price, quantity, _id }: OrderItemType) => (
        <div className="transaction-product-card">
          <img src={photo} alt={name} />
          <Link to={`/product/${_id}`}>{name}</Link>
          <span>
            ${price} X {quantity} = ${price * quantity}
          </span>
        </div>
      );
export default TransactionManagement