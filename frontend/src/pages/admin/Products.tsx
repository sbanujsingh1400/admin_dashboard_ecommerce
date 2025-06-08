import AdminSidebar from "./components/AdminSidebar";
import { createColumnHelper, type Column } from "@tanstack/react-table";
import TableHOC from "./components/TableHOC";
import { useCallback, useEffect, useState, type ReactElement } from "react";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useAllProductsQuery } from "@/redux/api/productApi";
import { Skeleton } from "./components/Loader";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";


interface DataType{
    photo:ReactElement;
    name:string;
    price:number;
    stock:number;
    action:ReactElement;
}

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
     const {user} = useSelector((state:any)=>state.userReducer);
    //  console.log(user)
     const {isLoading,isError,error,data}= useAllProductsQuery(user._id);
  const [row,setRows]= useState<DataType[]>([]);
   
  
  useEffect(() => {
    if (data?.products?.length) {
        const arr=data.products.map((i) => ({
          photo: (
            <img
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwUIq4sq5TVMfsBN7rgHQ_NbI2dhKhrzAenw&s"
              }
              alt={i.name}
            />
          ),
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
        }))
        // console.log(arr)
      setRows(
        arr
      );
      
    } else {
      console.warn("No products found in API response", data);
    }
  }, [data]);
  let Table =useCallback(TableHOC<DataType>(columns,row,"dashboard-product-box","Products"),[row])
  return (
    <div className="adminContainer" >
      
    {/* sidebar */}
  <AdminSidebar />
<main>{Table()}</main>
<Link to="/admin/product/new" className="create-product-btn" >
  <FaPlus />
</Link>

  </div>
  )
}

export default Products