import React, { useContext, useEffect, useState } from 'react'
import BalanceSheetBarChart from '../../components/hotelOwner/BarChart'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useAppContext } from '../../context/AppContext'
import DonutChart from '../../components/hotelOwner/PieChart'

const Charts = () => {

  const {  getToken } = useAppContext();
  const [ chartData, setChartData ] = useState([]);
  const [activeTab, setActiveTab] = useState("yearly");
  const [title, setTitle] = useState();

  


  const fetchChartData = async ()=>{
        try {
            
              const { data } = await axios.get('/api/charts/totBookings', {
              headers: { Authorization: `Bearer ${await getToken()}` }
              });
              if (data.success && data.pieData) {
                console.log("pieData" , data.pieData )
                  // TRANSFORM THE DATA HERE
                  const formattedData = data.pieData.flatMap((item) => ([
                    { label: 'Online', value: item.online , color: '#0088FE' },
                    { label: 'Cash', value: item.cash , color: '#00C49F' },
                    
                  ]));
                  setTitle(data.pieData[0]._id)
                  setChartData(formattedData);
                  
                }
          } 
            
        catch (error) {
            toast.error(error.message)
        }
    }

useEffect(() => {
  fetchChartData();
}, []);




  return (
    <div className="bg-gray-200 min-h-screen flex items-start justify-center pt-28">
      {/* Card */}
      <div className="bg-white w-full max-w-4xl rounded-2xl shadow-md p-6">
        {/* Title */}
        <div><h1>Total Bookings since {title}</h1></div>
        
          <div>
              <DonutChart
                data={chartData}
              />
          </div>
      </div>
    </div>
  )
}

export default Charts
