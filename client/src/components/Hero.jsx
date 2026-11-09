import React, { use, useEffect, useRef, useState } from 'react'
import { assets, cities } from '../assets/assets'
import { useAppContext } from '../context/AppContext';

const Hero = () => {

    const {navigate, getToken, axios, setSearchedCities} = useAppContext();
    const [destination, setDestination] = useState('');
    const videoRef = useRef(null);
    const [offset, setOffset] = useState(0);
    const [curveLoaded, setCurveLoaded] = useState(false);
    const [paraLoaded, setParaLoaded] = useState(false);
    const [titleLoaded, setTitleLoaded] = useState(false);
    const [formLoaded, setFormLoaded] = useState(false);
    

    const onSearch = async (e) => {
        e.preventDefault();
        navigate(`/rooms?destination=${destination.toLowerCase()}`);
        // call api to save recent searched cities
        await axios.post('/api/user/store-recent-search', {recentSearchedCity: destination},
            {headers: {Authorization: `Bearer ${await getToken()}`}});
        
        // add destination to searched cities max 3 recent searched cities
        setSearchedCities((prevSearchedCities)=> {
            const updatedSearchedCities = [...prevSearchedCities, destination];
            if(updatedSearchedCities.length > 3) {
                updatedSearchedCities.shift();
            }
            return updatedSearchedCities;
            
        })
        
    }

    // function to blur the video on scroll
    useEffect(() => {
        const handleScroll = () => setOffset(window.pageYOffset);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const blurValue = Math.min(10, offset * 0.05);


    useEffect(() => {
        const curve = setTimeout(() => {
            setCurveLoaded(true);
        }, 6000);

        const form = setTimeout(() => {
            setFormLoaded(true);
        }, 6500);

        const para = setTimeout(() => {
            setParaLoaded(true);
        }, 6500);

        const title = setTimeout(() => {
            setTitleLoaded(true);
        }, 7000);

        // Cleanup in case component unmounts before timeout
        return () => {
            clearTimeout(curve);
            clearTimeout(form);
            clearTimeout(para);
            clearTimeout(title);
        }
        
    },[])

  return (
    <div className='relative w-full h-screen text-white overflow-hidden'>
        <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        ref={videoRef}
        src={assets.bg_Video}
        autoPlay
        loop
        muted

        style={{
          filter: `blur(${blurValue}px)`,
          transformOrigin: 'center center',
        }}
      />

            <div className="relative z-10 flex flex-col items-center justify-center px-6 md:px-16 lg:px-24 xl:px-32 h-full">
                
                <h1 className={`font-momo text-[50px] md:text-5xl md:text-[100px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-15 md:mt-20
                    transition-all duration-1000 ease-out
                    ${titleLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
                    WELCOME
                </h1>
                <p className= {`text-center max-w-230 mt-1 md:mt-10 sm:text-[20px] md:text-[30px] md:text-base
                    transition-all duration-1000 ease-out
                    ${paraLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

                    <span className="bg-black font-shadows text-white px-2 py-1 inline-block mb-1  ">Discover the timeless beauty of Sri Lanka,</span>
                    <br />
                    <span className="bg-black font-shadows text-white px-2 py-1 inline-block mb-1 ">where breathtaking landscapes and vibrant culture await.</span>
                    <br />
                    <span className="bg-black font-shadows text-white px-2 py-1 inline-block ">Begin your unforgettable journey today.</span>
                </p>

                <form onSubmit={onSearch} className={`bg-white text-gray-500 rounded-lg px-6 py-4 mt-4  flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto transition-all duration-1000 ease-out
                    ${formLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>

                <div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.calenderIcon} alt="" className='h-4' />
                        <label htmlFor="destinationInput">Destination</label>
                    </div>
                    <input onChange={e=> setDestination(e.target.value)} value={destination.toLowerCase()} list='destinations' id="destinationInput" type="text" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" placeholder="Type here" required />
                    <datalist id='destinations'>
                        {cities.map((city, index)=>(
                            <option key={index} value={city}/>
                        ))}
                    </datalist>
                </div>

                <div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.calenderIcon} alt="" className='h-4' />
                        <label htmlFor="checkIn">Check in</label>
                    </div>
                    <input id="checkIn" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
                </div>

                <div>
                    <div className='flex items-center gap-2'>
                        <img src={assets.calenderIcon} alt="" className='h-4' />
                        <label htmlFor="checkOut">Check out</label>
                    </div>
                    <input id="checkOut" type="date" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none" />
                </div>

                <div className='flex md:flex-col max-md:gap-2 max-md:items-center'>
                    <label htmlFor="guests">Guests</label>
                    <input min={1} max={4} id="guests" type="number" className=" rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none  max-w-16" placeholder="0" />
                </div>

                <button className='flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1' >
                    <img src={assets.searchIcon} alt="search" className='h-8' />
                    <span>Search</span>
                </button>
            </form>
        </div>
        <div className={`absolute bottom-[-250px] md:bottom-[-800px] left-1/2  w-[120%] -translate-x-1/2 overflow-visible transition-all duration-1000 ease-out
            ${curveLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <img src={assets.hero_curve} className="w-full h-auto object-cover" />
        </div>
    </div>
  )
}

export default Hero
