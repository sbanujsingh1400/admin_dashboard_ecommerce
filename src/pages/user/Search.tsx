import ProductCart from "@/components/user/ProductCart";
import { useState } from "react"


const Search = () => {
 const [search,setSearch] = useState("");
 const [sort,setSort] = useState("");
 const [page,setPage] = useState<number>(1);
 const [maxPrice,setMaxPrice] = useState<number>();
 const [category,setCategory] = useState("");
 const isPrevPage = true;
 const isNextPage = true;

  return (
    <div className="product-search-page flex justify-start items-stretch gap-[2rem] min-h-[calc(100vh-6.5vh)] " >
      <aside className="min-w-[20rem]  p-[2rem]  shadow-2xl flex flex-col justify-start items-stretch gap-[0.5rem] " >
        <h2 className="tracking-[3px] uppercase font-[300]" >Filters</h2>
        <div className="">
          <h4>Sort</h4>
          <select className="w-[100%] p-[1rem] bg-white border-[1px] border-[rgba(154,154,154,0.38)] rounded-[5px] shadow-[2px_5px_10px_rgba(0,0,0,0.247)] m-[0.5rem] " value={sort} onChange={e=>setSort(e.target.value)} >
            <option value="">None</option>
            <option value="asc">Price (Low to High)</option>
            <option value="dsc">Price (High to Low) </option>
          </select>
        </div>
        <div className="">
          <h4>Max Price: {maxPrice || ""}</h4>
        <input className="w-[100%] p-[1rem] bg-white border-[1px] border-[rgba(154,154,154,0.38)] rounded-[5px] shadow-[2px_5px_10px_rgba(0,0,0,0.247)] m-[0.5rem] " type="range" min={100} max={100000} value={maxPrice} onChange={(e)=>setMaxPrice(Number(e.target.value))}  />
        </div>
        <div className="">
          <h4>Category</h4>
          <select className="w-[100%] p-[1rem] bg-white border-[1px] border-[rgba(154,154,154,0.38)] rounded-[5px] shadow-[2px_5px_10px_rgba(0,0,0,0.247)] m-[0.5rem] " value={category} onChange={e=>setCategory(e.target.value)} >
            <option value="">All</option>
            <option value="">Sample2</option>
            <option value="">sample1 </option>
          </select>
        </div>
      </aside>
      <main className="w-[100%] py-[2rem]  " >
        <h1 className="tracking-[3px] uppercase font-[300] text-3xl " >Products</h1>
        <input className="p-[1rem]  w-[50%] rounded-[5px] m-[1rem] text-[1.2rem] block " type="text" placeholder="Search by name..." value={search} onChange={(e)=>{setSearch(e.target.value)}} />
          <div className="search-product-list flex justify-start items-start gap-[1rem] flex-wrap h-[calc(100%-10rem)] ">
          <ProductCart productId='1' price={2000} name='abc' photo='https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/186x116---wm._SY116_CB667322346_.jpg' stock={5} handler={()=>{}} />
          </div>
          <article className="flex justify-center items-center gap-[1rem]">
            <button className="flex justify-center items-center gap-[1rem] bg-blue-500 rounded-[10px] p-[0.6rem] px-4 py-2 disabled:opacity-[0.8] "  onClick={e=>setPage(prev=>prev-1)} >Prev</button>
            <span>{page} of {4}</span>
            <button  className="flex justify-center items-center gap-[1rem] bg-blue-500 rounded-[10px] p-[0.6rem] px-4 py-2 disabled:opacity-[0.8] "  onClick={e=>setPage(prev=>prev+1)} >Next</button>
            </article>
         </main>
    </div>
  )
}

export default Search