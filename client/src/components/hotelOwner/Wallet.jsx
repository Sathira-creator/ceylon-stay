import React from 'react'
import { useAppContext } from '../../context/AppContext';

const Wallet = () => {
    const { setShowWallet, dashboardData } = useAppContext();

  return (

    <div onClick={()=> setShowWallet(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50 '>
        <div onClick={(e) => e.stopPropagation()}
        className="flex flex-col items-center justify-between p-6 w-72 h-64 bg-gray-100 rounded-xl shadow-lg ml-15 mb-70 md:ml-210 md:mb-100">
        
        {/* Top Section: Available Balance Label */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Available Balance
        </h3>

        {/* Middle Section: Balance Amount */}
        <p className="text-4xl font-bold text-green-600 mb-8">
            ${dashboardData.paidRevenue.toFixed(2)} {/* Formats to 2 decimal places */}
        </p>

        {/* Bottom Section: Withdraw Button */}
        <button 
        // Call the passed onWithdraw function on click
            className="w-full py-3 px-6 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition-colors duration-200"
        >
            Withdraw
        </button>
        
        </div>
    </div>
  )
}

export default Wallet
