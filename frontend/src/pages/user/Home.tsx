
import ProductCart from '@/components/user/ProductCart'
import { useLatestProductsQuery } from '@/redux/api/productApi'
import { addToCart } from '@/redux/reducer/cartReducer';
import { CartItem } from '@/redux/types/types';
import { Skeleton } from '@admin/components/Loader';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'

const Home = () => {
   const dispatch = useDispatch();
  const {data,isLoading,isError}=useLatestProductsQuery("");

  const addToCartHandler = (cartItem:CartItem)=>{
    
    if(cartItem.stock<1)return toast.error("Out of Stock");
      dispatch(addToCart(cartItem))

      toast.success('Added to Cart')


  }

  
  if(isError)toast.error('Cannot Fetch the Products');
  if(isLoading)return <Skeleton width='80vw'></Skeleton>
  return (
    <div className='home w-[100%] h-[calc(100vh-4rem)] flex flex-col m-auto py-[2rem] px-[5%] ' >
      
      <section className=' w-[100%] h-[18.75rem]  m-auto bg-[url(https://www.websitedesigncity.com.au/wp-content/uploads/2019/09/ecommerce-banner.jpg)] bg-no-repeat bg-center bg-cover ' >

      </section>
      <h1 className='tracking-[3px] font-[300] text-[1.5rem] uppercase flex justify-between items-center mt-[3rem] ' >Latest Products
        <Link to={'/search'} className='findmore text-[1rem]' >More</Link>
      </h1>
      <main className='w-[100%] flex flex-1 flex-wrap   gap-[1rem] overflow-x-auto hide-scrollbar ' >
        {
          data?.products.map((p=><ProductCart key={p._id} productId={p._id} price={p.price} name={p.name} photo='https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/186x116---wm._SY116_CB667322346_.jpg' stock={p.stock} handler={addToCartHandler} />))
        }
    
      </main>
    </div>
  )
}

export default Home