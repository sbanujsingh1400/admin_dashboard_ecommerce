import AdminSidebar from "./components/AdminSidebar";
import { createColumnHelper, type Column } from "@tanstack/react-table";
import TableHOC from "./components/TableHOC";
import { useCallback, useEffect, useState, type ReactElement } from "react";

import {  FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAllUsersQuery, useDeleteUserMutation } from "@/redux/api/userApi";
import { setDatasets } from "node_modules/react-chartjs-2/dist/utils";
import { responseToast } from "@/utils/features";
interface DataType{
  Avatar:ReactElement;
  Name:string;
  Gender:string;
  Email:string;
  Role:string;
  Action:ReactElement
}
const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

const arr:DataType[]=[{
  Avatar: (
    <img
      style={{
        borderRadius: "50%",
      }}
      src={img}
      alt="Shoes"
    />
  ),
  Name: "Emily Palmer",
  Email: "emily.palmer@example.com",
  Gender: "female",
  Role: "user",
  Action: (
    <button>
      <FaTrash />
    </button>
  ),
},

{
  Avatar: (
    <img
      style={{
        borderRadius: "50%",
      }}
      src={img2}
      alt="Shoes"
    />
  ),
  Name: "May Scoot",
  Email: "aunt.may@example.com",
  Gender: "female",
  Role: "user",
  Action: (
    <button>
      <FaTrash />
    </button>
  ),
}];
const columnHelper =createColumnHelper<DataType>()


const columns = [columnHelper.accessor('Avatar',{
  cell:info=>info.getValue()
}),columnHelper.accessor('Name',{
  cell:info=>info.getValue()
}),columnHelper.accessor('Email',{
  cell:info=>info.getValue()
}),columnHelper.accessor('Gender',{
  cell:info=>info.getValue()
}),columnHelper.accessor('Role',{
  cell:info=>info.getValue()
}),,columnHelper.accessor('Action',{
cell:info=>info.getValue()
})]
const Customers = () => {

  const {user} = useSelector((state:any)=>state.userReducer);

  const {data:api}= useAllUsersQuery(user._id)
  const [deleteUserapi]= useDeleteUserMutation()
  console.log(api)
  const [data,setData]= useState<DataType[]>([]);
  const deleteHandler= async(id:string)=>{

    const res =await deleteUserapi({userId:id,adminUserId:user?._id});

    responseToast(res,null,"")
  }
  const Table =useCallback(TableHOC<DataType>(columns,data,"dashboard-product-box","Customers"),[data])
   
  useEffect(()=>{

   if(api){
    console.log(api)
    
    setData(api.users.map(u=>({
      Avatar:<img  style={{
        borderRadius: "50%",
      }} src={u.photo} />,
      Name:u.name,
      Email:u.email,
      Gender:u.gender,
      Role:u.role,
      Action:<button onClick={()=>{deleteHandler(u._id)}} ><FaTrash /></button>
    })))
   }

  },[api])



  return (
    <div className="adminContainer" >
      
    {/* sidebar */}
  <AdminSidebar />
  <main>{Table()}</main>
{/* <Link to="admin/product/new" className="create-product-btn" >
  <FaPlus />
</Link> */}

  </div>
  )
}

export default Customers