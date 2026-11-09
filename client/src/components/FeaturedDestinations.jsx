import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'
import { featuredDestinations } from '../assets/assets'
import FD_Card from './FD_Card'

const FeaturedDestinations = () => {

  const {rooms, navigate} = useAppContext();
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-5 bg-slate-50 py-20'>

      <h1 className={`font-momo text-[30px] md:text-[50px] text-center md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-15 md:mt-20`}>
          Featured Destinations
      </h1>

      <p className={`font-shadows text-[20px] md:text-[30px] text-center md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-1 md:mt-1`}>
          From hidden gems to iconic cities,
          your dream destinations await.
      </p>

      <div className='flex flex-wrap items-center justify-center gap-4 mt-20'>
        {featuredDestinations.slice(0,4).map((city, index)=>(
            <FD_Card key={index} city={city} index={index} />
        ))}
      </div>

      <button onClick={()=>{navigate('/featured-destinations'); scrollTo(0,0)}}
        className='my-16 px-4 py-2 text-sm font-medium border border-gray-300 
        rounded bg-white hover:bg-gray-100 transition-all cursor-pointer'>
        View All Destinations
      </button>
    </div>
  )
}

export default FeaturedDestinations
