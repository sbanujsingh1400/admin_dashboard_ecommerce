import AdminSidebar from "../components/AdminSidebar";
import { createColumnHelper, type Column } from "@tanstack/react-table";
import TableHOC from "../components/TableHOC";
import { useCallback, useState, type ReactElement } from "react";


import { Link } from "react-router-dom";
interface DataType{
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}


const arr:DataType[]=[ {
  user: "Charas",
  amount: 4500,
  discount: 400,
  quantity: 3,
  status: <span className="red">Processing</span>,
  action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
},
{
  user: "Xavirors",
  amount: 6999,
  discount: 400,
  status: <span className="green">Shipped</span>,
  quantity: 6,
  action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
},
{
  user: "Xavirors",
  amount: 6999,
  discount: 400,
  status: <span className="purple">Delivered</span>,
  quantity: 6,
  action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
},];
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
  const [data]= useState<DataType[]>(arr);
  const Table =useCallback(TableHOC<DataType>(columns,data,"dashboard-product-box","Transactions"),[])
  return (
    <div className="adminContainer" >
      
    {/* sidebar */}
  <AdminSidebar />
  <main>{Table()}</main>

  </div>
  )
}

export default Transaction