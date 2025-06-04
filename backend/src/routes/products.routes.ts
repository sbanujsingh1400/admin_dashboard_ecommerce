import express ,{Request} from 'express'

import { adminOnly } from '../middlewares/auth';
import { singleUpload } from '../middlewares/multer';
import { deleteProduct, getAdminProducts, getAllCategories, getLatestProducts, getSingleProduct, newProduct, updateProduct } from '../controllers/products.controller';

const app = express.Router();


app.post("/new",singleUpload,(req,res,next)=>{
    newProduct(req,res,next);
})

app.get('/latest',(req,res,next)=>{
    getLatestProducts(req,res,next)
})
app.get('/all',(req,res,next)=>{
    getLatestProducts(req,res,next)
})

app.get('/category',(req,res,next)=>{
    getAllCategories(req,res,next)
})

app.get('/admin-products',(req,res,next)=>{
    getAdminProducts(req,res,next)
})

app.get('/admin-products',(req,res,next)=>{
    getAdminProducts(req,res,next)
})

app.route("/:id").get((req:Request<{id:string},{},{}>,res,next)=>{getSingleProduct(req,res,next)}).put((req,res,next)=>{adminOnly(req,res,next)},(req:Request<{id:string},{},{}>,res,next)=>{updateProduct(req,res,next)}).delete((req,res,next)=>{deleteProduct(req,res,next)})

export default app;