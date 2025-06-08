import { Route, Routes } from "react-router-dom"
// import { Dashboard } from "./pages/dashboard"
import { lazy, Suspense, useEffect } from "react"
import Loader from "./pages/admin/components/Loader"
import Shipping from "@user/Shipping";
import Orders from "@user/Orders";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducer/userReducer";
import { getUser } from "./redux/api/userApi";
import { UserReducerInitialState } from "./redux/types/reducer-types";
import ProctedRoute from "./components/ProtectedRoute";
import Checkout from "@user/Checkout";
// import Login from "./pages/Login";




// USER IMPORTS LAZY LOADING
const  Header =lazy(()=>import("@/components/Header")); 
const Home = lazy(()=>import('@user/Home'));
const Login = lazy(()=>import("@/pages/Login"))

const Search = lazy(()=>import('@user/Search'));

const Cart = lazy(()=>import('@user/Cart'));
// ADMIN IMPORTS LAZY LOADING
const Dashboard = lazy(()=>import("./pages/admin/Dashboard"))
const Customers = lazy(()=>import("./pages/admin/Customers"))
const Transaction = lazy(()=>import("./pages/admin/Transaction"))
const Products = lazy(()=>import("./pages/admin/Products"))
const NewProduct = lazy(()=>import("./pages/admin/management/NewProduct"))
const ProductManagement = lazy(()=>import("./pages/admin/management/ProductManagement"))
const TransactionManagement = lazy(()=>import("./pages/admin/management/TransactionManagement"))
const BarCharts = lazy(()=>import("./pages/admin/charts/BarCharts"))
const PieCharts = lazy(()=>import("./pages/admin/charts/PieCharts"))
const LineCharts = lazy(()=>import("./pages/admin/charts/LineCharts"))
const Stopwatch = lazy(()=>import("./pages/admin/apps/Stopwatch"))
const Toss = lazy(()=>import("./pages/admin/apps/Toss"))
const Coupon = lazy(()=>import("./pages/admin/apps/Coupon"))


function App() {
  const dispatch = useDispatch();
  const {user,loading}=useSelector((state:{userReducer:UserReducerInitialState})=>state.userReducer)


useEffect(()=>{

  onAuthStateChanged(auth,async (user)=>{
         
    if(user){

      const data = await getUser(user.uid);
    dispatch(userExist(data.user))
      console.log("Logged In");

    }else {
      dispatch(userNotExist());
    }


  })



},[])

if(loading)return <>Loading...</>
  return (
    <Suspense fallback={<Loader />} >
     
      <Header user={user} />
    <Routes>
      {/* ADMIN ROUTES START */}
      <Route element={<ProctedRoute  isAuthenticated={!user?false:true} adminRoute={true} isAdmin={true} />} >
      <Route path="/admin/dashboard" element={<Dashboard />}  />
      <Route path="/admin/product" element={<Products />}  />
      <Route path="/admin/customer" element={<Customers />}  />
      <Route path="/admin/transaction" element={<Transaction />}  />
      </Route>
      {/* CHARTS */}
      
      <Route path="/admin/chart/bar" element={<BarCharts />}  />
      <Route path="/admin/chart/pie" element={<PieCharts />}  />
      <Route path="/admin/chart/line" element={<LineCharts />}  />
     {/* Apps */}
     <Route path="/admin/app/stopwatch" element={<Stopwatch />}  />
     <Route path="/admin/app/toss" element={<Toss />}  />
     <Route path="/admin/app/coupon" element={<Coupon />}  />

      {/* MANAGEMENT */}
      <Route path="/admin/product/new" element={<NewProduct />}  />
      <Route path="/admin/product/:id" element={<ProductManagement />}  />
      <Route path="/admin/transaction/:id" element={<TransactionManagement />}  />


      {/* ADMIN ROUTES END */}
     
      <Route path="/" element={<Home />}  />
      <Route path="/search" element={<Search />}  />
      <Route path="/cart" element={<Cart />}  />
 
     {/* Not Logged in  routes */}
     <Route path="/login" element={<ProctedRoute isAuthenticated={user?false:true} ><Login /></ProctedRoute>}  />

 {/* Logged In User Routes */}
      <Route element={<ProctedRoute  isAuthenticated={!user?false:true} />} >
     <Route path="/shipping" element={<Shipping />}  />
     <Route path="/orders" element={<Orders />}  />
     <Route path="/pay" element={<Checkout />}  />
     
     </Route>
    </Routes>
    <Toaster position="bottom-center" />
         </Suspense>
  )
}

export default App
