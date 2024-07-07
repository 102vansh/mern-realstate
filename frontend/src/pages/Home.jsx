import React, { useEffect } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import SwiperCore from 'swiper'
import axios from 'axios'
import { Navigation } from 'swiper/modules'
import { useState } from 'react'
import 'swiper/css/bundle'
import { Link } from 'react-router-dom'
import Listitem from '../component/Listitem'
const Home = () => {
    const[offerlisting,setofferlisting] = useState([])
    const[salelisting,setsalelisting] = useState([])
    const[rentlisting,setrentlisting] = useState([])
SwiperCore.use([Navigation])
    useEffect(() => {
const offerfunc = async () => {
    try {
        const response = await axios.get('http://localhost:5001/api/v1/list/get?offer=true', { withCredentials: true })
        setofferlisting(response.data.listings)

    } catch (error) {
        console.log(error)
    }
    const rentfunc = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/v1/list/get?rent=true', { withCredentials: true })
            setrentlisting(response.data.listings)
    
        } catch (error) {
            console.log(error)
        }
    }
    rentfunc()
        const salefunc = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/v1/list/get?sale=true', { withCredentials: true })
                setsalelisting(response.data.listings)
        
            } catch (error) {
                console.log(error)
            }
        }
        salefunc()
    }

    offerfunc()
   

    }, [])
  return (
    <div>
<div className='flex flex-col gap-6 p-28 px-3max-w-6xl mx-auto '>
    <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find Your Next <span className='text-slate-500'>Perfect</span>
    <br/>
    Place with Ease</h1>
    <div className=''>
        Vansh Esstate is the best Place To find Your next Perfect Place To Live.
        <br/>
        We Have wide Rnge Of Property for You to Choose from.
    </div>
    <Link to={'/search'} className='text-xs'>Let's get Started</Link>
</div>
<Swiper navigation>
{
    offerlisting && offerlisting.map((item)=>(
        <SwiperSlide>

            <div style={{background:`url(${item.imageUrls[0]}) no-repeat center`, backgroundSize: 'cover'}} className='h-[500px] ml-3 mb-8' key={item._id} >

            </div>
        </SwiperSlide>
    ))
}


</Swiper>
<div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
{
    offerlisting && (
        <div className=''>
<div className='my-3 '>
<h2 className='text-2xl font-semibold text-slate-600'>Recents Offer</h2>
<Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show More Offers</Link>
</div>
<div className='flex flex-wrap gap-4'>
{
    offerlisting && offerlisting.map((item)=>(
        <Listitem listing = {item} key={item._id} />
    ))
}
</div>
    </div>
    )
}
{
    rentlisting && (
        <div className=''>
<div className=''>
<h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Rent</h2>
<Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show More Offers</Link>
</div>
<div className='flex flex-wrap gap-4'>
{
    rentlisting && rentlisting.map((item)=>(
        <Listitem listing = {item} key={item._id} />
    ))
}
</div>
    </div>
    )
}
{
    salelisting && (
        <div className=''>
<div className=''>
<h2 className='text-2xl font-semibold text-slate-600'>Recents Places for Sale </h2>
<Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show More Offers</Link>
</div>
<div className='flex flex-wrap gap-4'>
{
salelisting && salelisting.map((item)=>(
        <Listitem listing = {item} key={item._id} />
    ))
}
</div>
    </div>
    )
}

</div>
    </div>
  )
}

export default Home



