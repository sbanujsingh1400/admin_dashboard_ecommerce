
import { useNewProductMutation } from '@/redux/api/productApi'
import AdminSidebar from '../components/AdminSidebar'
import { useState, type ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { responseToast } from '@/utils/features'
import { useNavigate } from 'react-router-dom'


const NewProduct = () => {
    
    const { user } = useSelector((state:any) => state.userReducer);
 const [newProduct]= useNewProductMutation()

    const  [name, setName] = useState<string>('')
    const  [price, setPrice] = useState<number>()
    const  [stock, setStock] = useState<number>()
    const  [photo, setPhoto] = useState<string>('')
    const  [category, setCategory] = useState<string>('')
    const navigate = useNavigate();
const submitHandler=async(e:React.FormEvent<HTMLFormElement>
    )=>{
        e.preventDefault();
        if(!name ||!price || !stock || !category){
            toast.error('Please fill All the fields');

            return;
        }
        

        const formData = new FormData();

        formData.set('name',name);
        formData.set('price',price.toString());
        formData.set('category',category);
        formData.set('stock',stock.toString());
        // formData.set('photo',photo);

        const res = await newProduct({id:user?._id!,formData})
        
         responseToast(res,navigate,'/admin/product')
}

    const changeImageHandler =(e:ChangeEvent<HTMLInputElement>)=>{

    const file:File | undefined  = e?.target?.files?.[0]; 
   console.log(file)
    const reader:FileReader = new FileReader();

    if(file){
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            if(typeof reader.result === 'string' )setPhoto(reader.result)
        }

    }

    }
  return (
    <div className="adminContainer">
        <AdminSidebar />
        <main className='product-management' >
            <article>
                <form onSubmit={(e)=>{submitHandler(e)}}>
                   <h2>New Product</h2> 
                   <div>
                    <label >Name</label>
                    <input required type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} />
                   </div>
                   <div>
                    <label >Price</label>
                    <input required type="number" placeholder='Price' value={price} onChange={(e)=>setPrice(Number(e.target.value))} />
                   </div>
                   <div>
                    <label >Stock</label>
                    <input required type="number" placeholder='Stock' value={stock} onChange={(e)=>setStock(Number(e.target.value))} />
                   </div>
                   <div>
                    <label >category</label>
                    <input required type="text" placeholder='Category' value={category} onChange={(e)=>setCategory(e.target.value)} />
                   </div>
                   <div>
                    <label >Photo</label>
                    <input  type="file" onChange={(e)=>{changeImageHandler(e)}} />
                   </div>
                   {photo&&<img src={photo} />}
                   <button className='manage-button' >Add new Product</button>
                </form>
            </article>
        </main>
    </div>
  )
}

export default NewProduct