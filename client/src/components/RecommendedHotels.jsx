import React, { useEffect, useState } from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContext'

const RecommendedHotels = () => {

  const {rooms, searchedCities} = useAppContext();
  const [recommended, setRecommended] = useState([]);

  const filterHotels = ()=> {
    const filteredHotels = rooms.slice().filter( room => searchedCities.includes(room.hotel.city));
    setRecommended(filteredHotels);
    
    
  }

  useEffect(()=>{
    filterHotels();
  },[rooms, searchedCities])



  return recommended.length > 0 && (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-5 bg-slate-50 py-20'>

      <h1 className={`font-momo text-[30px] md:text-[50px] text-center md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-15 md:mt-20`}>
          Recommended Hotels
      </h1>

      <p className={`font-shadows text-[20px] md:text-[30px] text-center md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-1 md:mt-1`}>
          Experience the finest stays around you,
          curated for unforgettable moments.
      </p>

      

      <div className='flex flex-wrap items-center justify-center gap-4 mt-20'>
        {recommended.slice(0,4).map((room, index)=>(
            <HotelCard key={room._id} room={room} index={index} />
        ))}
      </div>

      
    </div>
  )
}

export default RecommendedHotels
