
import AdminSidebar from '../components/AdminSidebar'
import { BarChart } from '../components/Charts'

const BarCharts = () => {
    return (
        <div className="adminContainer">
        <AdminSidebar />
        <main className='chart-container' >
          <h1>Bar Charts</h1>
          <section>
            <BarChart data_1={[123,345,765,3,64,3245,]} data_2={[123,345,567,876,654,]} title_1='Products' title_2='Users' bgColor_1='hsl(260,50%,60%)' bgColor_2='hsl(260,90%,90%)' labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']} />
          <h2>TOP SELLING PRODUCTS & TOP CUSTOMERS</h2>
          </section>
          <section>
            <BarChart horizontal={true} data_1={[123,345,765,3000,64,3245,]} data_2={[]} title_1='Products' title_2='Users' bgColor_1='hsl(260,50%,60%)' bgColor_2='hsl(260,90%,90%)' labels={['January', 'February', 'March', 'April', 'May', 'June', 'July']} />
          <h2>TOP SELLING PRODUCTS & TOP CUSTOMERS</h2>
          </section>
            
        </main>
    </div>
      )
    }

export default BarCharts