import express, { Request }  from 'express'
import { deleteUser, getAllUser, getUser, newUser } from '../controllers/user.controller';
import { adminOnly } from '../middlewares/auth';

const app = express.Router();


app.post("/new",(req,res,next)=>{
    newUser(req,res,next);
})

app.get('/all',(req,res,next)=>{adminOnly(req,res,next)},(req,res,next)=>{
    getAllUser(req,res,next)
})


app.get('/:id',(req:Request<{id:string}>,res,next)=>{
    getUser(req,res,next)
})

app.delete('/:id',(req:Request<{id:string}>,res,next)=>{
    deleteUser(req,res,next)
})

export default app;