
import ProductCart from '@/components/user/ProductCart'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='home w-[100%] h-[calc(100vh-4rem)] flex flex-col m-auto py-[2rem] px-[5%] ' >
      
      <section className=' w-[100%] h-[18.75rem]  m-auto bg-[url(https://www.websitedesigncity.com.au/wp-content/uploads/2019/09/ecommerce-banner.jpg)] bg-no-repeat bg-center bg-cover ' >

      </section>
      <h1 className='tracking-[3px] font-[300] text-[1.5rem] uppercase flex justify-between items-center mt-[3rem] ' >Latest Products
        <Link to={'/search'} className='findmore text-[1rem]' >More</Link>
      </h1>
      <main className='w-[100%] flex-1  gap-[1rem] overflow-x-auto hide-scrollbar ' >

        <ProductCart productId='1' price={2000} name='abc' photo='https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/186x116---wm._SY116_CB667322346_.jpg' stock={5} handler={()=>{}} />
      </main>
    </div>
  )
}

export default Home