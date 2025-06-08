
import { useSelector } from 'react-redux'
import AdminSidebar from '../components/AdminSidebar'
import { useEffect, useState, type ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from '@/redux/api/productApi';
import { responseToast } from '@/utils/features';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

const ProductManagement = () => {
    
    const {user}= useSelector((state:any)=>state.userReducer);

    const [updateProduct]= useUpdateProductMutation();
    const [deleteProduct]= useDeleteProductMutation();

    const params = useParams();
    const navigate = useNavigate();

    const {data}= useProductDetailsQuery(params.id!)

    const  [name, setName] = useState<string>('')
    const  [price, setPrice] = useState<number>()
    const  [stock, setStock] = useState<number>()
    const  [photo, setPhoto] = useState<string>('')
    const  [category, setCategory] = useState<string>('')

    // const  [nameUpdate, setNameUpdate] = useState<string>(name)
    // const  [priceUpdate, setPriceUpdate] = useState<number| undefined>(price)
    // const  [stockUpdate, setStockUpdate] = useState<number | undefined >(stock)
    // const  [photoUpdate, setPhotoUpdate] = useState<string>(photo)

    const changeImageHandler =(e:ChangeEvent<HTMLInputElement>)=>{

    const file:File | undefined  = e?.target?.files?.[0]; 

    const reader:FileReader = new FileReader();

    if(file){
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            if(typeof reader.result === 'string' )setPhoto(reader.result)
        }

    }

    }

const submitHandler = async (e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault();


if(!name ||!price || !stock || !category){
    toast.error('Please fill All the fields');

    return;
}
const formData = new FormData();
console.log(name,price,stock,category);

if(price)formData.set('price',price.toString());
if(stock)formData.set('stock',stock.toString());
if(photo)formData.set('photo',photo);
if(category)formData.set('category',category);


const res = await updateProduct({formData,userId:user?._id,productId:params.id!});
responseToast(res,navigate,"/admin/product")


}


const deleteHandler = async()=>{
    const res = await deleteProduct({userId:user._id,productId:data?.product._id!});
    responseToast(res,navigate,'/admin/product');
}


useEffect(()=>{

    if(data){
        console.log(data)
        setName(data.product.name)
        setPrice(data.product.price)
        setStock(data.product.stock)
        setPhoto('https://classroom.codingninjas.com/assets-app/icons/streaks/streak.svg')
        setCategory(data.product.category)
    }


},[data]);

  return (
    <div className="adminContainer">
        <AdminSidebar />
        <main className='product-management' >
            <section>
                <strong>ID-{params.id}</strong>
               { <img src={photo} alt="Product" />}
               <p>{name}</p>
               {(stock && stock >0 )? <span className='green' >{stock} Available</span>:<span className='red' >0 Available</span>}
               <h3>${price}</h3>
            </section>
            <article >
                <button onClick={deleteHandler} className='product-delete-btn tracking-[2.5px] flex justify-center relative left-[250px] items-center gap-1 font-bold  text-white bg-black rounded-full p-3 -mt-5' ><FaTrash /></button>
                <form onSubmit={(e)=>submitHandler(e)} >
                   <h2>Update Product</h2> 
                   <div>
                    <label >Name</label>
                    <input required type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
                   </div>
                   <div>
                    <label >Price</label>
                    <input required type="text" placeholder='Price' value={price} onChange={(e)=>setPrice(Number(e.target.value))} />
                   </div>
                   <div>
                    <label >Stock</label>
                    <input required type="text" placeholder='Stock' value={stock} onChange={(e)=>setStock(Number(e.target.value))} />
                   </div>
                   <div>
                    <label >category</label>
                    <input required type="text" placeholder='Category' value={category} onChange={(e)=>setCategory(e.target.value)} />
                   </div>
                   <div>
                    <label >Photo</label>
                    <input  type="file"  onChange={(e)=>{changeImageHandler(e)}} />
                   </div>
                   {<img src={photo} alt='Image Upload Fail' />}
                   <button className='manage-button' >Update Product</button>
                </form>
            </article>
        </main>
    </div>
  )
}


export default ProductManagement