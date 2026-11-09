import React, { useContext, useEffect, useState } from 'react'
import BalanceSheetBarChart from '../../components/hotelOwner/BarChart'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAppContext } from '../../context/AppContext'
import LineChartRevenue from '../../components/hotelOwner/LineChart'

const RevenueChart = () => {

  const {  getToken, showBarChart, setShowBarChart  } = useAppContext();
  const [ chartData, setChartData ] = useState([]);
  const [activeTab, setActiveTab] = useState("yearly");
  const [activeType, setActiveType] = useState("bar");

  const tabs = ["yearly", "monthly", "weekly"];
  const type = ["bar", "line"];


  const fetchChartData = async ({period})=>{
        try {
            if(period == "yearly"){
              const { data } = await axios.get('/api/charts/revenue', {
              params: { period },
              headers: { Authorization: `Bearer ${await getToken()}` }
              });
              if (data.success && data.chartData) {
                // TRANSFORM THE DATA HERE
                const formattedData = data.chartData.map((item) => ({
                  xData: item._id.toString(), // Converts 2024 to "2024"
                  totalRevenue: item.totalRevenue,
                  online: item.online,
                  cash: item.cash,
                }));

                setChartData(formattedData);
                console.log("Formatted Data:", formattedData);
              }
            } else if(period == "monthly"){
                const { data } = await axios.get('/api/charts/revenue', {
                params: { period },
                headers: { Authorization: `Bearer ${await getToken()}` }
                });
                if (data.success && data.chartData) {
                  // TRANSFORM THE DATA HERE
                  const formattedData = data.chartData.map((item) => ({
                    xData: item._id.toString(), // Converts 2024 to "2024"
                    totalRevenue: item.totalRevenue,
                    online: item.online,
                    cash: item.cash,
                  }));

                  setChartData(formattedData);
                  console.log("Formatted Data:", formattedData);
                }
            }   else if(period == "weekly"){
                const { data } = await axios.get('/api/charts/revenue', {
                params: { period },
                headers: { Authorization: `Bearer ${await getToken()}` }
                });
                if (data.success && data.chartData) {
                  // TRANSFORM THE DATA HERE
                  const formattedData = data.chartData.map((item) => ({
                    xData: `Week ${item._id.week}, ${item._id.year}`, 
                    totalRevenue: item.totalRevenue,
                    online: item.online,
                    cash: item.cash,
                  }));

                  setChartData(formattedData);
                  console.log("Formatted Data:", formattedData);
                }
              }
            
        } catch (error) {
            toast.error(error.message)
        }
    }

useEffect(() => {
  fetchChartData({ period: activeTab });
}, [activeTab]);



  return (
    <div onClick={()=> setShowBarChart(false)}  
    className=" fixed top-0 bottom-0 left-0 right-0 z-100 flex items-center justify-center bg-black/70">
      {/* Card */}
      <div onClick={(e)=> e.stopPropagation()}
      className="bg-white w-full max-w-4xl rounded-2xl shadow-md p-6">
        {/* Tabs */}
        <div className="flex items-center justify-between mb-4 ">
          <div className="flex gap-2 ">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() =>setActiveTab(tab)}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition
                  ${
                    activeTab === tab
                      ? "bg-white text-gray-900 shadow"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-2 ">
            {type.map((type) => (
              <button
                key={type}
                onClick={() =>setActiveType(type)}
                className={`
                  px-5 py-2 rounded-full text-sm font-medium transition
                  ${
                    activeType === type
                      ? "bg-white text-gray-900 shadow"
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }
                `}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        
          <div>
              {activeType == "bar" ? (<BalanceSheetBarChart
                  title="Total Revenue"
                  data={chartData}
              />

              ) :(<LineChartRevenue
                  title="Total Revenue"
                  data={chartData}
              />)
              }
          </div>
      </div>
    </div>
  )
}

export default RevenueChart
