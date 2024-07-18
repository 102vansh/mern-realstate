// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import SwiperCore from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css/bundle';
// import {Navigation} from 'swiper/modules'
// import { FaBed } from 'react-icons/fa';

// const Listing = () => {
//   const [listing, setListing] = useState([]);
//   const params = useParams();
//   const[loading,setloading]  = useState(false)

//   useEffect(() => {
//     const fetchList = async () => {
//       try {
//         setloading(true)
//         const response = await axios.get(`http://localhost:5001/api/v1/list/get/${params.listingid}`, { withCredentials: true });
//         console.log(response.data);
//         setListing(response.data.listing);
//         setloading(false)
//       } catch (error) {
//         console.error("Error fetching listing:", error);
//         setloading(false)
//       }
//     };

//     fetchList();
//   }, [params.listingid]);
// if(loading){
//   return <h1>Loading.....</h1>
// }
//   return (
//     <div>
//    <Swiper navigation>
//     {
//         listing.imageUrls?.map((url,index)=>{
//             console.log(url)
//             return(
//                 <SwiperSlide key={index}>
                    
//                     <div className='h-[500px]' style={{background:`url(${url}) no-repeat center background-cover`}}>
//                         <img src={url} alt='listing' className='w-[100%] h-[500px] object-cover' ></img>  

//                               </div>
//                          <div className='flex flex-col gap-3'  >
//                             {listing.name}
//                          </div>   
//                          <div className='flex gap-3'  >
//                             <p className='bg-red-900 w-full max-w-[200px] text-white  text-center p-1 rounded-md'>{listing.type === 'rent' ? 'Rent' : 'Sale'}</p>
//                             <p className='bg-green-900 w-full max-w-[200px] text-white  text-center p-1 rounded-md'>${listing.regularprice-listing.discountedprice}</p>
//                          </div>
//                          <p className='text-slate-800'>{listing.location}</p>
//                          <p><span className='font-semibold'>Description-{''}</span>
//                          {listing.description}
//                          </p>
//                          <ul className='flex gap-3'>
//                             <li className='flex items-center gap-2'><FaBed className='text-lg'/>
//                             {listing.bedrooms >1 ? `${listing.bedrooms} Bedrooms` : `${listing.bedrooms} Bed` }</li>
//                             <li className='flex items-center gap-2'><FaBed className='text-lg'/>
//                             {listing.bedrooms >1 ? `${listing.bathrooms} bathrooms` : `${listing.bathrooms} bath` }</li>
//                             <li className='flex items-center gap-2'><FaBed className='text-lg'/>
//                             {listing.bedrooms >1 ? `${listing.bedrooms} Bedrooms` : `${listing.bedrooms} Bed` }</li>
//                             <li className='flex items-center gap-2'><FaBed className='text-lg'/>
//                             {listing.bedrooms >1 ? `${listing.bedrooms} Bedrooms` : `${listing.bedrooms} Bed` }</li>
                         
                         
//                          </ul>
//                 </SwiperSlide>
//             )
//         })
//     }
//    </Swiper>
//     </div>
//   );
// };

// export default Listing;
import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
// import {FaLocationDot} from 'react-icons/fa'
// import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/bundle';
// import {FaLocationDot} from 'react-icons/fa'
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
// import 'swiper/css/navigation';
import { FaBed, FaBath, FaChair, FaParking,  FaShare, } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Contact from '../component/Contact';

// Install the Swiper modules
// SwiperCore.use([Navigation]);

const Listing = () => {
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const[contact,setcontact] = useState(false)
  const [copied, setCopied] = useState(false);
const {user} = useSelector((state)=>state.user.user)

  useEffect(() => {
    const fetchList = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5001/api/v1/list/get/${params.listingid}`, { withCredentials: true });
        console.log(response.data);
        setListing(response.data.listing);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching listing:", error);
        setLoading(false);
      }
    };

    fetchList();
  }, [params.listingid]);

  if (loading) {
    return <h1>Loading.....</h1>;
  }

  return (
    <div className="listing-container">
      <Swiper navigation
    
      >
        {
          listing.imageUrls?.map((url, index) => {
            console.log(url);
            return (
              <SwiperSlide key={index}>
                <div className='h-[500px]' style={{ background: `url(${url}) no-repeat center center / cover` }}>
                  <img src={url} alt='listing' className='w-full h-[500px] object-cover hidden' />
                </div>
              </SwiperSlide>
            );
          })
        }
      </Swiper>

      <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
      <div className="listing-details">
        <div className='flex flex-col gap-8'>
         <h1 className='text-3xl font-bold m-8'>{listing.name}</h1> 
        </div>
        <div className='flex gap-5 ml-5'>
          <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
            {listing.type === 'rent' ? 'Rent' : 'Sale'}
          </p>
          <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
            ${listing.regularprice - listing.discountedprice}
          </p>
        </div>
        <p className='text-slate-800 ml-7 font-semibold mt-4 flex items-center gap-2'>
        <FaMapMarkerAlt style={{fontSize:'20px'}} className='text-green-800 '/>
        {listing.address}
        
        </p>
        <p className='text-slate-800 ml-5 mt-9'><span className='font-semibold '>Description: </span>{listing.description}</p>
        <ul className='flex gap-7 ml-5 mt-4 mb-4'>
        <li className='flex items-center gap-2'>
            <FaBed className={listing.bedroom>1 ?'text-green':'text-red'}  />
            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms` : `${listing.bedrooms} Bed`}
          </li>
          <li className='flex items-center gap-2'>
            <FaBath className='text-lg' />
            {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `${listing.bathrooms} Bath`}
          </li>
          <li className='flex items-center gap-2'>
            <FaParking className='text-lg' />
{listing.parking ? 'Parking spot' : 'No parking'}
          </li>
          <li className='flex items-center gap-2'>
            <FaChair className='text-lg' />
{listing.furnished ? 'Furnished' : 'Not furnished'}
          </li>
        </ul>
        
            <button onClick={() => setcontact(true)} className='bg-slate-700 text-white uppercase hover:opacity-100 p-3 rounded-lg ml-12 mb-4'>Contact Landlord</button>
        
        {/* <button onClick={() => setcontact(true)} className='bg-slate-700 text-white uppercase hover:opacity-100 p-3 rounded-lg ml-12 mb-4'>Contact Landlord</button> */}
      {contact && <Contact listing={listing}/>}
   
      </div>
    </div>
  );
};

export default Listing;

