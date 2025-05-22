
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
  ArcElement,
} from 'chart.js';
import { useEffect, useRef } from 'react';
import { Bar, Doughnut, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

 interface BarChartProps {
    horizontal?:boolean,
    data_1:number[],
    data_2:number[],
    title_1:string,
    title_2:string
    bgColor_1:string,
    bgColor_2:string,
    labels?:string[]
 }

export function BarChart({ horizontal,data_1=[],data_2=[],title_1,title_2,bgColor_1,bgColor_2,labels}:BarChartProps) {

    const options:ChartOptions<"bar"> = {
        responsive: true,
        indexAxis:horizontal?"y":"x",
        plugins: {
          legend: {
            display:false
          },
          title: {
            display: false,
            text: 'Chart.js Bar Chart',
          },
          
          

        },
        scales:{
            y:{
                beginAtZero:true,
                grid:{
                    display:false
                }
            },
            x:{
                beginAtZero:true,
                grid:{
                    display:false
                }
            }
          }
      };
      
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
       const data:ChartData<"bar",number[],string> = {
        labels,
        datasets: [
          {
            label: title_1,
            data:data_1,
            backgroundColor: bgColor_1,
            barThickness:'flex',
            barPercentage:1,
            categoryPercentage:0.4
          },
          {
            label: title_2,
            data:data_2,
            backgroundColor: bgColor_2,
            barThickness:'flex',
            barPercentage:1,
            categoryPercentage:0.4
          },
        ],
      };


  return <Bar options={options} data={data} />;
}

interface DoughnutChartProps {
   
    data:number[],
    backgroundColor:string[],
   cutout?:number|string,
    labels:string[],
    legends?:boolean
    offset?:number[]
 }


export const CircularChart = ({data,backgroundColor,cutout,labels,legends=true,offset}:DoughnutChartProps)=>{
const doughnutData :ChartData<"doughnut",number[],string>={ labels,datasets:[{data,backgroundColor,borderWidth:0,offset}]}
const doughnutOptions:ChartOptions<'doughnut'>={
   responsive:true,
   cutout,
   plugins:{
    legend:{
        display:legends,
        position:"bottom",
        labels:{
          
            padding:40
        }
    }
   }
}
    return <Doughnut data={doughnutData} options={doughnutOptions} />
}



interface PieChartProps {
   
  data:number[],
  backgroundColor:string[],
  labels:string[],
  offset?:number[]
}


export const PieChart = ({data,backgroundColor,labels,offset}:PieChartProps)=>{
const pieChartData :ChartData<"pie",number[],string>={ labels,datasets:[{data,backgroundColor,borderWidth:1,offset}]}
const pieOptions:ChartOptions<'pie'>={
 responsive:true,
 
 plugins:{
  legend:{
      
    display:false
  }
 }
}
  return <Pie data={pieChartData} options={pieOptions} />
}


interface LineChartProps {
  data: number[];
  label: string;
  backgroundColor: string;
  borderColor: string;
  labels?: string[];
}
// const months = ["January", "February", "March", "April", "May", "June", "July"];
export const LineChart = ({
  data,
  label,
  backgroundColor,
  borderColor,
  labels ,
}: LineChartProps) => {
  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },

    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const lineChartData: ChartData<"line", number[], string> = {
    labels,
    datasets: [
      {
        fill: true,
        label,
        data,
        backgroundColor,
        borderColor,
      },
    ],
  };
  const chartRef = useRef<any>(null);
    
  useEffect(() => {
      return () => {
        if (chartRef.current) {
          chartRef.current.destroy?.();
        }
      };
    }, [data, labels]);
  return <Line  ref={chartRef} options={options} data={lineChartData} />;
};