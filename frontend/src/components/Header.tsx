import { User } from "@/redux/types/types";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa"
import { Link } from "react-router-dom"
import toast from "react-hot-toast";

const user = {_id:'lkj',role:'admipn'};

type PropsType={
  user :User|null
}
const Header = ({user}:PropsType) => {
     const  [isOpen, setIsOpen] = useState(false);
     const logoutHandler = async()=>{

    try {
      await signOut(auth)
     toast.success("Signed Out Successfully");
     setIsOpen(false)
    } catch (error) {
      toast.error("Signed Out Failed");
    }


     }

  return (
    <nav className="header p-[1rem] flex  justify-end items-stretch gap-[1.2rem]   " >
        <Link  className="text-black text-[1.2rem] tracking-[2px] "  to={"/"} >HOME</Link>
        <Link  className="text-black text-[1.2rem] tracking-[2px] " to={"/search"} ><FaSearch /></Link>
        <Link  className="text-black text-[1.2rem] tracking-[2px] " to={"/cart"} ><FaShoppingBag /></Link>
     {user?._id ? (<>
     <button className="border-none text-[1.2rem] cursor-pointer bg-transparent hover:text-[rgb(0,104,136)] " onClick={()=>{setIsOpen(prev=>(!prev))}} ><FaUser /> </button>
     
     <dialog open={isOpen}>
        
        <div className="flex flex-col items-end fixed top-[45px] right-[25px]" >
            {user?.role === 'admin' &&(<Link className="text-black text-[1.2rem] tracking-[2px] " to={'/admin/dashboard'} >Admin</Link>)}
            <Link  className="text-black text-[1.2rem] tracking-[2px] " to={"/orders"} >Orders</Link>
            <button onClick={logoutHandler} >
                <FaSignOutAlt />
            </button>

        </div>
     </dialog>
     
     </>):(<Link className="text-black text-[1.2rem] tracking-[2px] " to={'/login'} ><FaSignInAlt /></Link>)}

    </nav>
  )
}

export default Header