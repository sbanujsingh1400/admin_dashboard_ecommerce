
import AdminSidebar from '../../components/AdminSidebar'
import { useState, type ChangeEvent } from 'react'

const ProductManagement = () => {
    const  [name, setName] = useState<string>('')
    const  [price, setPrice] = useState<number>()
    const  [stock, setStock] = useState<number>()
    const  [photo, setPhoto] = useState<string>('')

    const  [nameUpdate, setNameUpdate] = useState<string>(name)
    const  [priceUpdate, setPriceUpdate] = useState<number| undefined>(price)
    const  [stockUpdate, setStockUpdate] = useState<number | undefined >(stock)
    const  [photoUpdate, setPhotoUpdate] = useState<string>(photo)

    const changeImageHandler =(e:ChangeEvent<HTMLInputElement>)=>{

    const file:File | undefined  = e?.target?.files?.[0]; 

    const reader:FileReader = new FileReader();

    if(file){
        reader.readAsDataURL(file);
        reader.onloadend = ()=>{
            if(typeof reader.result === 'string' )setPhotoUpdate(reader.result)
        }

    }

    }

const submitHandler = (e:React.FormEvent<HTMLFormElement>)=>{
e.preventDefault();

setName(nameUpdate);
setPrice(priceUpdate)
setStock(stockUpdate)
setPhoto(photoUpdate)

}

  return (
    <div className="adminContainer">
        <AdminSidebar />
        <main className='product-management' >
            <section>
                <strong>ID-randomId</strong>
               {photo &&  <img src={photo} alt="Product" />}
               <p>{name}</p>
               {(stock && stock >0 )? <span className='green' >{stockUpdate} Available</span>:<span className='red' >0 Available</span>}
               <h3>${price}</h3>
            </section>
            <article>
                <form onSubmit={(e)=>submitHandler(e)} >
                   <h2>New Product</h2> 
                   <div>
                    <label >Name</label>
                    <input required type="text" placeholder='Name' value={nameUpdate} onChange={(e)=>setNameUpdate(e.target.value)} />
                   </div>
                   <div>
                    <label >Price</label>
                    <input required type="text" placeholder='Price' value={priceUpdate} onChange={(e)=>setPriceUpdate(Number(e.target.value))} />
                   </div>
                   <div>
                    <label >Stock</label>
                    <input required type="text" placeholder='Stock' value={stockUpdate} onChange={(e)=>setStockUpdate(Number(e.target.value))} />
                   </div>
                   <div>
                    <label >Photo</label>
                    <input required type="file"  onChange={(e)=>{changeImageHandler(e)}} />
                   </div>
                   {photo&&<img src={photo} />}
                   <button className='manage-button' >Add new Product</button>
                </form>
            </article>
        </main>
    </div>
  )
}


export default ProductManagement