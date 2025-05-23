
import type { data } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import { CircularChart, PieChart } from '../components/Charts'
import {categories} from '../../../assets/data.json'

const PieCharts = () => {
  return (
    <div className="adminContainer">
    <AdminSidebar />
    <main className='chart-container' >
      <h1>Pie & Dougnut Charts</h1>
      <section>
      <div><PieChart labels={['Processing','Shipped','Delivered']} data={[12,9,14] } backgroundColor={['skyblue','lightblue','lightgreen']}  offset={[0,0,20]}  />    </div>
      <h2>Order Fullfillment Ratio</h2>
      </section>
      <section>
      <div><CircularChart labels={[...categories.map(i=>i.heading),]} legends={false} data={categories.map(i=>i.value)} backgroundColor={['skyblue','lightblue','lightgreen','purple']}  offset={[0,0,20]}  />    </div>
      <h2>Products Category Ratios</h2>
      </section>

      <section>
      <div><CircularChart labels={['In Stock',"Out of stock"]} legends={false} data={[40,30]} backgroundColor={['red','yellow','lightgreen','purple']}  offset={[0,50]}  />    </div>
      <h2>Stock Availability</h2>
      </section>
      <section>
          <div>
            <CircularChart
              labels={[
                "Marketing Cost",
                "Discount",
                "Burnt",
                "Production Cost",
                "Net Margin",
              ]}
              data={[32, 18, 5, 20, 25]}
              backgroundColor={[
                "hsl(110,80%,40%)",
                "hsl(19,80%,40%)",
                "hsl(69,80%,40%)",
                "hsl(300,80%,40%)",
                "rgb(53, 162, 255)",
              ]}
              legends={false}
              offset={[20, 30, 20, 30, 80]}
            />
          </div>
          <h2>Revenue Distribution</h2>
        </section>

        <section>
          <div>
            <PieChart
              labels={[
                "Teenager(Below 20)",
                "Adult (20-40)",
                "Older (above 40)",
              ]}
              data={[30, 250, 70]}
              backgroundColor={[
                `hsl(10, ${80}%, 80%)`,
                `hsl(10, ${80}%, 50%)`,
                `hsl(10, ${40}%, 50%)`,
              ]}
              offset={[0, 0, 50]}
            />
          </div>
          <h2>Users Age Group</h2>
        </section>

        <section>
          <div>
            <CircularChart
              labels={["Admin", "Customers"]}
              data={[40, 250]}
              backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
              offset={[0, 80]}
            />
          </div>
        </section>  
    </main>
</div>
  )
}

export default PieCharts