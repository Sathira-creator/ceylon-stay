import React from 'react'
import { featuredDestinations } from '../assets/assets'
import FD_Card from '../components/FD_Card'

const FeaturedDestinations = () => {
  return (
    <div className='flex flex-col-reverse lg:flex-row items-start justify-between
    pt-28 md:pt-25 px-4 md:px-16 lg:px-24 xl:px-10 pb-28 md:pb-10'>
        <div className='flex flex-wrap items-center justify-center gap-5 mt-20'>
        {featuredDestinations.map((city, index)=>(
            <FD_Card key={index} city={city} index={index} />
        ))}
      </div>
      
    </div>
  )
}

export default FeaturedDestinations
