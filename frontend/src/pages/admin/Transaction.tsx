import AdminSidebar from "./components/AdminSidebar";
import { createColumnHelper, type Column } from "@tanstack/react-table";
import TableHOC from "./components/TableHOC";
import { useCallback, useEffect, useState, type ReactElement } from "react";


import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAllOrdersQuery } from "@/redux/api/orderApi";
interface DataType{
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}



const columnHelper =createColumnHelper<DataType>()


const columns = [columnHelper.accessor('user',{
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
const Transaction = () => {
  const {user} = useSelector((state:any)=>state.userReducer);

  const {isError,isLoading,data:api ,error}= useAllOrdersQuery(user._id)
  console.log(api)
  const [data,setData]= useState<DataType[]>([]); 
  const Table =useCallback(TableHOC<DataType>(columns,data,"dashboard-product-box","Transactions"),[data])
  
  useEffect(() => {
    if (api?.orders?.length) {
        const arr=api.orders.map((i) => ({
        user:i.user.name,
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
    <div className="adminContainer" >
      
    {/* sidebar */}
  <AdminSidebar />
  <main>{Table()}</main>

  </div>
  )
}

export default Transaction