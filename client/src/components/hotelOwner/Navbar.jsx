import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { UserButton } from '@clerk/clerk-react'
import { useAppContext } from '../../context/AppContext'


const Navbar = () => {

  const { isOwner, showWallet, setShowWallet, dashboardData, setDashboardData } = useAppContext();

  return (
    <div className='flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3
     bg-white transition-all duration-300' 
     >

        <Link to='/'>
            <img src={assets.bottom_logo} alt="logo" className='h-20 '/>
        </Link>

        {/* Wallet icon */}
        <div className="flex items-center md:ml-100 w-70 md:w-50  p-2 rounded-full bg-white shadow-md cursor-pointer hover:bg-gray-300 transition-colors" onClick={()=> isOwner ? setShowWallet(true): null}>


          {/* 1. Icon Container (Smaller circle) */}
          <div className="flex items-center justify-center w-5 h-5 md:w-10 md:h-10  rounded-full bg-gray-100 mr-3 shadow-inner">
            
            {/* Wallet Icon (Smaller image) */}
            <img src={assets.wallet_icon} className="w-6 h-6" />
          </div>

          {/* 2. Text Label */}
          <span className=" text-sm lg:text-lg font-momo text-gray-800 select-none">
            Your Wallet
          </span>
        </div>

        <UserButton/>
      
    </div>
  )
}

export default Navbar
