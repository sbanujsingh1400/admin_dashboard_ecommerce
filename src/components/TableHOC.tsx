
import { flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable as useTable, type Column, type TableOptions } from '@tanstack/react-table'


function TableHOC<T extends Object> (columns:any,data:T[],containerClassname:string,heading:string)  {
  console.log(data)
  return  function HOC(){
     const tableOptions:TableOptions<T>={
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
     }
    const table = useTable(tableOptions)
    return <div className={containerClassname} >
      <h2 className="heading" >{heading}</h2>
      <table className="table"  >
        <thead>
       {table.getHeaderGroups().map((headerGroup)=>(<tr key={headerGroup.id} >
       {
        headerGroup.headers.map(header=><th key={header.id} >

            {header.isPlaceholder? null: flexRender(header.column.columnDef.header,header.getContext())}
        </th>)
       }</tr>))}
        </thead>
        <tbody  >
            {table.getRowModel().rows.map((row)=>(<tr key={row.id} >
                {row.getVisibleCells().map(cell=>(<td key={cell.id} >
                    {flexRender(cell.column.columnDef.cell,cell.getContext())}
                </td>))}
            </tr>))}

        </tbody>
      </table>
    </div>
  };
}

export default TableHOC