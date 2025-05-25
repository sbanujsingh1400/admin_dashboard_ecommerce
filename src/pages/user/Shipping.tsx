import { ChangeEvent, useState } from "react"
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";


const Shipping = () => {
    const [shippingInfo,setShippingInfo] = useState({
     address:"",
     city:"",
     state:'',
     country:'',
     pincode:''
    });
     const navigate = useNavigate();
    const changeHandler = (e:ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>{

        setShippingInfo((prev)=>({...prev,[e.target.name]:e.target.value}))
    };

    return <div className="shipping flex  justify-center items-center gap-[1rem] mt-[10px]  h-full w-full " > 
    <button className="back-btn h-[2.5rem] w-[2.5rem] bg-black text-white flex justify-center items-center rounded-full cursor-pointer fixed top-[4rem] left-[2rem] " onClick={()=>navigate('/cart')} ><div className=" transition-all duration-[0.3s] hover:translate-x-[-0.25rem]" ><  BiArrowBack  /></div></button> 

    <form  className="max-w-[450px] w-[100%] flex flex-col p-[2rem] gap-3 " >
      <h1 className="tracking-[2px] uppercase font-[300] m-[2rem] text-center " >Shipping Address</h1>  
      <input className="p-[1rem] border border-solid border-[rgba(31,31,31,0.351)] rounded-[5px] w-[100%]  " required type='text' placeholder="Address" name="address" value={shippingInfo.address} onChange={changeHandler} />
      <input className="p-[1rem] border border-solid border-[rgba(31,31,31,0.351)] rounded-[5px w-[100%]  "  required type='text' placeholder="City" name="city" value={shippingInfo.city} onChange={changeHandler} />
      <input   className="p-[1rem] border border-solid border-[rgba(31,31,31,0.351)] rounded-[5px w-[100%]  " required type='text' placeholder="State" name="state" value={shippingInfo.state} onChange={changeHandler} />
      {/* <input required type='text' placeholder="Country" name="country" value={shippingInfo.country} onChange={changeHandler} /> */}
      <select className="p-[1rem] border border-solid border-[rgba(31,31,31,0.351)] rounded-[5px w-[100%]  " name="country" required value={shippingInfo.country} onChange={changeHandler} > <option value="India">India</option> </select>
      <input className="p-[1rem] border border-solid border-[rgba(31,31,31,0.351)] rounded-[5px w-[100%]  " required type='number' placeholder="Pincode" name="pincode" value={shippingInfo.pincode} onChange={changeHandler} />
     <button type="submit" className="bg-blue-500 rounded-[5px] cursor-pointer p-[1rem] text-white " >Pay Now</button>
    </form>
    </div>

}

export default Shipping