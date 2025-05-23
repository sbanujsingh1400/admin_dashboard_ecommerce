
import { createColumnHelper, type Column } from "@tanstack/react-table";
import TableHOC from "./TableHOC"

interface DataType{
    id:string;
    quantity:number;
    discount:number;
      amount:number;
      status:string;
}

const columnHelper =createColumnHelper<DataType>()


const columns = [columnHelper.accessor('quantity',{
    cell:info=>info.getValue()
}),columnHelper.accessor('amount',{
    cell:info=>info.getValue()
}),columnHelper.accessor('discount',{
    cell:info=>info.getValue()
}),columnHelper.accessor('status',{
    cell:info=>info.getValue()
})]



const DashBoardTable = ({data=[]}:{data:DataType[]}) => {
  return (
   TableHOC<DataType>(columns,data,"transaction-box","Top Transaction")()
  )
}

export default DashBoardTable