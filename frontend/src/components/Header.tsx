import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"

const user = {_id:'lkj',role:'admipn'};

const Header = () => {
     const  [isOpen, setIsOpen] = useState(true);
     const logoutHandler = ()=>{}

  return (
    <nav className="header p-[1rem] flex  justify-end items-stretch gap-[1.2rem]   " >
        <Link  onClick={()=>{setIsOpen(prev=>(!prev))}} className="text-black text-[1.2rem] tracking-[2px] "  to={"/"} >HOME</Link>
        <Link  onClick={()=>{setIsOpen(prev=>(!prev))}} className="text-black text-[1.2rem] tracking-[2px] " to={"/search"} ><FaSearch /></Link>
        <Link  onClick={()=>{setIsOpen(prev=>(!prev))}} className="text-black text-[1.2rem] tracking-[2px] " to={"/cart"} ><FaShoppingBag /></Link>
     {user?._id ? (<>
     <button className="border-none text-[1.2rem] cursor-pointer bg-transparent hover:text-[rgb(0,104,136)] " onClick={()=>{setIsOpen(prev=>(!prev))}} ><FaUser /> </button>
     
     <dialog open={isOpen}>
        
        <div>
            {user?.role === 'admin' &&(<Link className="text-black text-[1.2rem] tracking-[2px] " to={'/admin/dashboard'} >Admin</Link>)}
            <Link  className="text-black text-[1.2rem] tracking-[2px] " to={"/orders"} >Orders</Link>
            <button onClick={logoutHandler} >
                <FaSignOutAlt />
            </button>

        </div>
     </dialog>
     
     </>):(<Link className="text-white text-[1.2rem] tracking-[2px] " to={'/login'} ><FaSignInAlt /></Link>)}

    </nav>
  )
}

export default Header