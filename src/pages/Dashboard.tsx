import { BsSearch } from "react-icons/bs";
import AdminSidebar from "../components/AdminSidebar";
import { FaRegBell, FaRegUserCircle } from "react-icons/fa";
import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import data from '../assets/data.json'
import { BarChart, CircularChart } from "../components/Charts";
import { BiMaleFemale } from "react-icons/bi";
import DashBoardTable from "../components/DashBoardTable";


 const Dashboard = () => {
  return (
    <div className="adminContainer" >
    <AdminSidebar />
<main className="dashboard" >
  <div className="bar" > 
   <BsSearch size={20} />
   <input type="text" placeholder="Search for data, users,docs"  />
   <FaRegBell size={20} />
   <FaRegUserCircle size={29} color="skyblue" />

  </div>
<section className="widgetcontainer" >

 <WidgetItem percent={40} amount={true}  value={340000} heading="Revenue" color="skyblue" />
 <WidgetItem percent={-14} amount={false}  value={400} heading="Users" color="aqua" />
 <WidgetItem percent={80} amount={true}  value={230000} heading="Transactions" color="green" />
 <WidgetItem percent={30} amount={false}  value={1000} heading="Revenue" color="purple" />

 
</section>

<section className="graph-container" >

<div className="revenue-chart">
    <h2>Revenue & Transactions</h2>
    {/* Graph here */}
    <BarChart  data_1={[300,144,234,645,347,65,]} data_2={[12 ,345 ,567, 789 ,456]} bgColor_1="blue" bgColor_2="skyblue" title_1="Revenue" title_2="Transaction" labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']} />
</div>
<div className="dashboard-categories">
  <h2>Inventory</h2>
  <div>
   {data.categories.map((i,ind)=> <CategoryItem key={ind} heading={i.heading} value={i.value} color={`hsl(${i.value *4},${i.value*4}%,50%)`} />)}
  </div>
</div>
</section>

<section className="transaction-container">
  <div className="gender-chart">
    <h2>Gender Ratio</h2>
    {/* CHart here */}
    <CircularChart labels={["Female",'Male']} data={[12,19]} backgroundColor={["hsl(340,82%,56%)","rgba(53,162,235,0.8)"]} cutout={60} />
 <p><BiMaleFemale /></p>
  </div>
{/* Table */}
<DashBoardTable data={data.transaction} />
</section>




</main>

    </div>
  )
}

interface WidgetItemProps{
  
  heading:string,
  value:number,
  percent:number,
  color:string,
  amount?:boolean
}

const WidgetItem = ({heading,value,percent,color,amount}:WidgetItemProps)=>{
 return  <article className="widget" >
    <div className="widgetInfo">
      <p>{heading}</p>
      <h4>{amount? `$ ${value}`: value}</h4>
      {percent>0 ?<span className="green"> <HiTrendingUp/> +{percent}%{" "}</span>:<span className="red"> <HiTrendingDown/> {percent}%{" "}</span>  }
    </div>
    <div className="widgetCircle" style={{
      background:`conic-gradient(
        ${color} ${(Math.abs(percent)/100) * 360}deg,
        rgb(255,255,255) 0deg
      )`
    }}  >
      <span color={color}  style={{color:`${color}`}} > {percent}%</span>
    </div>
  </article>
}

interface CategoryItemProps {
  color:string;
  value:number;
  heading:string;
}


const CategoryItem = ({color,value,heading}:CategoryItemProps)=>{
  return <div className="category-item">
    <h5>{heading}</h5>
    <div>
    <div style={{
      backgroundColor:color,
      width:`${value}%`
    }} ></div>
</div>
 <span>{value}%</span>
  </div>
}




export default Dashboard;