import { useEffect, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';

const formatTime = (timeInSeconds:number)=>{
    const hours=Math.floor(timeInSeconds/3600);
    const minuites=Math.floor((timeInSeconds%3600)/60);
    const seconds=Math.floor((timeInSeconds%3600)%60);
return `${hours.toString().padStart(2,'0')}:${minuites.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`
}


const Stopwatch = () => {
    const [time, setTime] = useState<number>(0);
    const [isRunning, setIsRunning] = useState<boolean>(false);
   useEffect(()=>{
    let intervalID:number;
    if(isRunning){
         intervalID=setInterval(()=>{
            setTime((prev)=>prev+1);
         },1000);
        }
        return ()=>{
            clearInterval(intervalID);
        }
   },[isRunning])
  return (
    <div className="adminContainer" >
    <AdminSidebar />
    <main className="dashboard-app-container" >
        <h1>Stopwatch</h1>
        <section>
            <div className='stopwatch' >
                <h2>{formatTime(time)} </h2>
                <button onClick={()=>{setIsRunning((prev)=>!prev)}} >{!isRunning?'Start':'Stop'}</button>
                <button onClick={()=>{setIsRunning(false); setTime(0)}} >Reset</button>
            </div>
        </section>
    </main>
</div>
  )
}

export default Stopwatch