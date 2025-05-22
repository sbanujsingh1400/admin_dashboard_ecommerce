import AdminSidebar from "../components/AdminSidebar";
import { createColumnHelper, type Column } from "@tanstack/react-table";
import TableHOC from "../components/TableHOC";
import { useCallback, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";


interface DataType{
    photo:ReactElement;
    name:string;
    price:number;
    stock:number;
    action:ReactElement;
}
const arr:DataType[]=[{
  photo: <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfW5AKv2qDafX5UAJ68cs0M0jJyn6uMZQ2TILt7moOWSyzUnPmhFG1HA7r0UToht0rzWk&usqp=CAU'} alt="Shoes" />,
  name: "Puma Shoes Air Jordan Cook Nigga 2023",
  price: 690,
  stock: 3,
  action: <Link to="/admin/product/sajknaskd">Manage</Link>,
},{
  photo: <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwUIq4sq5TVMfsBN7rgHQ_NbI2dhKhrzAenw&s'} alt="Shoes" />,
  name: "Macbook",
  price: 232223,
  stock: 213,
  action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
}];
const columnHelper =createColumnHelper<DataType>()


const columns = [columnHelper.accessor('photo',{
    cell:info=>info.getValue()
}),columnHelper.accessor('name',{
    cell:info=>info.getValue()
}),columnHelper.accessor('price',{
    cell:info=>info.getValue()
}),columnHelper.accessor('stock',{
    cell:info=>info.getValue()
}),,columnHelper.accessor('action',{
  cell:info=>info.getValue()
})]
const Products = () => {
const [data]= useState<DataType[]>(arr);

const Table =useCallback(TableHOC<DataType>(columns,data,"dashboard-product-box","Products"),[])

  return (
    <div className="adminContainer" >
      
    {/* sidebar */}
  <AdminSidebar />
<main>{Table()}</main>
<Link to="admin/product/new" className="create-product-btn" >
  <FaPlus />
</Link>

  </div>
  )
}

export default Products