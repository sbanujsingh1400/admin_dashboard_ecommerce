import React from 'react'

const Loader = () => {
  return (
    <div>Loading ...</div>
  )
}

export const Skeleton = ({width,length=3}:{width:string,length?:number})=>{

const skeletons = Array.from({length},(v,idx)=>(<div key={idx} className={`skeleton-shape h-[30px] w-[${width?width:100+'%'}] bg-white mb-[10px] rounded-[4px] animate-bounce `}></div>))

  return <div className='skeleton-loader flex flex-col ' >
{skeletons}  </div>
}


export default Loader
