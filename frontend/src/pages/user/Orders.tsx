import { useMyOrdersQuery } from "@/redux/api/orderApi"
import TableHOC from "@admin/components/TableHOC"
import { Column, createColumnHelper } from "@tanstack/react-table"
import { ReactElement, useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { data, Link } from "react-router-dom"

type DataType ={
    _id:string,
    amount:number,
    quantity:number,
    discount:number,
    status:ReactElement,
    action:ReactElement
}

const arr:DataType[]=[ {
    _id: "Charas",
    amount: 4500,
    discount: 400,
    quantity: 3,
    status: <span className="red">Processing</span>,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    _id: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="green">Shipped</span>,
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    _id: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="purple">Delivered</span>,
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },];
const columnHelper =createColumnHelper<DataType>()
const columns = [columnHelper.accessor('_id',{
    cell:info=>info.getValue()
  }),columnHelper.accessor('amount',{
    cell:info=>info.getValue()
  }),columnHelper.accessor('discount',{
    cell:info=>info.getValue()
  }),columnHelper.accessor('quantity',{
    cell:info=>info.getValue()
  }),columnHelper.accessor('status',{
    cell:info=>info.getValue()
  }),,columnHelper.accessor('action',{
  cell:info=>info.getValue()
  })]

const Orders = () => {

const {user} = useSelector((state:any)=>state.userReducer);
const {isError,isLoading,data:api ,error}= useMyOrdersQuery(user._id)
const [data,setData]= useState<DataType[]>([]); 
console.log(api)

   TableHOC<DataType>(columns,arr,'dashboard-product-box','Orders',)
   const Table= useCallback(TableHOC<DataType>(columns,data,'dashboard-product-box','Orders',),[data])
   useEffect(() => {
    if (api?.orders?.length) {
        const arr=api.orders.map((i) => ({
        _id:i._id,
        amount:i.total,
        discount:i.discount,
        quantity:i.orderItems.length,
        status:<span className={`${i.status=='Processing'?"red":i.status=="Shipped"?"green":"purple"}`} >{i.status}</span>,
        action:<Link to={`/admin/transaction/${i._id}`}>Manage</Link>,


        }))
      
        setData(arr)
        
       
      
    } else {
      console.warn("No products found in API response", data);
    }
  }, [api]);



  return (
    <div className='container max-w-[1367px] w-[100%] m-auto overflow-auto mt-8 '  >
        <h1 className='tracking-[3px] text-3xl font-[300] uppercase text-left mx-[1rem]' >Orders</h1>
      {Table()}
    </div>
  )
}

export default Orders