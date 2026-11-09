import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const FD_Card = ({city, index}) => {

    const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

    // Adjust the threshold value to control the tilt effect
    const threshold = 12;

    const handleMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;
        setTilt({ x: y * -threshold, y: x * threshold });
    };
  return (
    <Link to={`/rooms?destination=${city.name.toLowerCase()}`} onClick={() => scrollTo(0.0)} key={index}
        className='relative max-w-70 w-full rounded-xl overflow-hidden
           bg-white text-gray-500/90 shadow-[0px_4px_4px_rgba(0,0,0,0.05)]'>
          <div className="rounded-xl shadow-xl overflow-hidden transition-transform duration-200 ease-out cursor-pointer max-w-80 bg-white"
            onMouseMove={handleMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            style={{ transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)` }}
        >
            <img src={city.image}
                alt="City_image" className="w-full h-52 object-cover"
            />
            <h3 className="mt-3 px-4 pt-3 mb-1 text-lg font-momo text-gray-800">
                {city.name}
            </h3>
            <p className="font-shadows text-sm px-4 pb-6 text-gray-600 w-5/6">
                {city.description}
            </p>
        </div>
    </Link>
  )
}

export default FD_Card
