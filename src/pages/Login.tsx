import { useState } from "react"
import { FcGoogle } from "react-icons/fc";

function Login() {
    const [gender,setGender]= useState('');
    const [date,setDate]= useState('');
    
  return (
    <div className="login h-[90vh]  flex flex-col items-center justify-center gap-[1rem]    " >
        <main className="w-[100%] h-[80%] max-w-[400px] p-[2rem]  flex flex-col justify-center items-stretch gap-[1rem] border-[rgba(162,162,162,1)] border-2 " >
            <h1 className="heading tracking-[2px] text-3xl text-center mb-8 font-[100] " >Login</h1>
            <div className="w-[100%] flex flex-col justify-start items-stretch gap-[1.2rem] " >
            <label className="" >Gender</label>
            <select  className="w-[100%] border-[rgba(162,162,162,0.53)] font-[100] rounded-[5px] border-solid border-2 p-[0.5rem] " value={gender} onChange={(e)=>setGender(e.target.value)} >
            <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            </div>
            <div className="w-[100%] flex flex-col justify-start items-stretch gap-[1.2rem]  " >
                <label > Date of birth </label>
                <input className="w-[100%] font-[100] border-[rgba(162,162,162,0.53)] rounded-[5px] border-solid border-2 p-[0.5rem] " type="date" value={date} onChange={e=>setDate(e.target.value)} />
            </div>
            <div className="w-[100%] flex flex-col justify-center items-center gap-[0.2rem] "   >
                <p className="text-center m-[2rem]" >Already Signed In Once</p>
                <button className=" w-[80%] m-auto h-[3rem] bg-blue-500 flex flex-row justify-between  items-center text-white rounded-[5px] cursor-pointer gap-[0.2rem]  " > <span className="bg-white m-[5px]" ><FcGoogle size={40} /></span> <span className=" mr-[15px]">Sign in with Google</span></button>
            </div>
        </main>

    </div>
  )
}

export default Login