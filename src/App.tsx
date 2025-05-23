import { Route, Routes } from "react-router-dom"
// import { Dashboard } from "./pages/dashboard"
import { lazy, Suspense } from "react"
import Loader from "./pages/admin/components/Loader"











// USER IMPORTS LAZY LOADING
const Home = lazy(()=>import('@user/Home'));
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
  

  return (
    <Suspense fallback={<Loader />} >
      
    <Routes>
      {/* ADMIN ROUTES START */}
      <Route path="/admin/dashboard" element={<Dashboard />}  />
      <Route path="/admin/product" element={<Products />}  />
      <Route path="/admin/customer" element={<Customers />}  />
      <Route path="/admin/transaction" element={<Transaction />}  />
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



    </Routes>
         </Suspense>
  )
}

export default App
