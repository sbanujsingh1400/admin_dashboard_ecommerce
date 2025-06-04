import express, { Request }  from 'express'
import { adminOnly } from '../middlewares/auth';
import { getBarCharts, getDashboardStats, getLineCharts, getPieCharts } from '../controllers/stats.controller';

const app = express.Router();


app.get("/stats",(req,res,next)=>{
    getDashboardStats(req,res,next);
})

app.get("/pie",(req,res,next)=>{adminOnly(req,res,next)},(req,res,next)=>{
    getPieCharts(req,res,next);
})

app.get("/bar",(req,res,next)=>{adminOnly(req,res,next)},(req,res,next)=>{
    getBarCharts(req,res,next);
})

app.get("/line",(req,res,next)=>{adminOnly(req,res,next)},(req,res,next)=>{
    getLineCharts(req,res,next);
})



export default app;