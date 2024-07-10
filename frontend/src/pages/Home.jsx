// import React, { useEffect } from 'react'
// import { SwiperSlide, Swiper } from 'swiper/react'
// import SwiperCore from 'swiper'
// import axios from 'axios'
// import { Navigation } from 'swiper/modules'
// import { useState } from 'react'
// import 'swiper/css/bundle'
// import { Link } from 'react-router-dom'
// import Listitem from '../component/Listitem'
// const Home = () => {
//     const[offerlisting,setofferlisting] = useState([])
//     const[salelisting,setsalelisting] = useState([])
//     const[rentlisting,setrentlisting] = useState([])
// SwiperCore.use([Navigation])
//     useEffect(() => {
// const offerfunc = async () => {
//     try {
//         const response = await axios.get('http://localhost:5001/api/v1/list/get?offer=true', { withCredentials: true })
//         setofferlisting(response.data.listings)
// console.log(response.data.listings)
//     } catch (error) {
//         console.log(error)
//     }
//     const rentfunc = async () => {
//         try {
//             const response = await axios.get('http://localhost:5001/api/v1/list/get?rent=true', { withCredentials: true })
//             setrentlisting(response.data.listings)
//     console.log(response.data.listings)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     rentfunc()
//         const salefunc = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5001/api/v1/list/get?sale=true', { withCredentials: true })
//                 setsalelisting(response.data.listings)
//         console.log(response.data.listings)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         salefunc()
//     }

//     offerfunc()
   

//     }, [])
//   return (
//     <div>
// <div className='flex flex-col gap-6 p-28 px-3max-w-6xl mx-auto '>
//     <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find Your Next <span className='text-slate-500'>Perfect</span>
//     <br/>
//     Place with Ease</h1>
//     <div className=''>
//         Vansh Esstate is the best Place To find Your next Perfect Place To Live.
//         <br/>
//         We Have wide Rnge Of Property for You to Choose from.
//     </div>
//     <Link to={'/search'} className='text-xs'>Let's get Started</Link>
// </div>
// <Swiper navigation>
// {
//     offerlisting && offerlisting.map((item)=>(
//         <SwiperSlide>

//             <div style={{background:`url(${item.imageUrls[0]}) no-repeat center`, backgroundSize: 'cover'}} className='h-[500px] ml-3 mb-8' key={item._id} >

//             </div>
//         </SwiperSlide>
//     ))
// }


// </Swiper>
// <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
// {
//     offerlisting && (
//         <div className=''>
// <div className='my-3 ml-5  text-xl'>
// <h2 className='text-2xl font-semibold text-slate-600'>Recents Offer</h2>
// <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show More Offers</Link>
// </div>
// <div className='flex flex-wrap gap-6 ml-5'>
// {
//     offerlisting && offerlisting.map((item)=>(
//         <Listitem listing = {item} key={item._id} />
//     ))
// }
// </div>
//     </div>
//     )
// }
// {
//     rentlisting && (
//         <div className=''>
// <div className=''>
// <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Rent</h2>
// <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show More Offers</Link>
// </div>
// <div className='flex flex-wrap gap-4'>
// {
//     rentlisting && rentlisting.map((item)=>(
//         <Listitem listing = {item} key={item._id} />
//     ))
// }
// </div>
//     </div>
//     )
// }
// {
//     salelisting && (
//         <div className=''>
// <div className=''>
// <h2 className='text-2xl font-semibold text-slate-600'>Recents Places for Sale </h2>
// <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show More Offers</Link>
// </div>
// <div className='flex flex-wrap gap-4'>
// {
// salelisting && salelisting.map((item)=>(
//         <Listitem listing = {item} key={item._id} />
//     ))
// }
// </div>
//     </div>
//     )
// }

// </div>
//     </div>
//   )
// }

// export default Home

import React, { useEffect, useState } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import  { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';

import axios from 'axios';
import { Link } from 'react-router-dom';
import Listitem from '../component/Listitem';
import 'swiper/css/bundle';

const Home = () => {
    const [offerListing, setOfferListing] = useState([]);
    const [saleListing, setSaleListing] = useState([]);
    const [rentListing, setRentListing] = useState([]);

    SwiperCore.use([Navigation]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [offerResponse, rentResponse, saleResponse] = await Promise.all([
                    axios.get('http://localhost:5001/api/v1/list/get?offer=true', { withCredentials: true }),
                    axios.get('http://localhost:5001/api/v1/list/get?rent=true', { withCredentials: true }),
                    axios.get('http://localhost:5001/api/v1/list/get?sale=true', { withCredentials: true })
                ]);

                setOfferListing(offerResponse.data.listings);
                setRentListing(rentResponse.data.listings);
                setSaleListing(saleResponse.data.listings);

                console.log('Offers:', offerResponse.data.listings);
                console.log('Rent:', rentResponse.data.listings);
                console.log('Sale:', saleResponse.data.listings);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto '>
                <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find Your Next <span className='text-slate-500'>Perfect</span>
                    <br />
                    Place with Ease</h1>
                <div>
                    Vansh Estate is the best place to find your next perfect place to live.
                    <br />
                    We have a wide range of property for you to choose from.
                </div>
                <Link to={'/search'} className='text-xs'>Let's get Started</Link>
            </div>

            <Swiper navigation>
                {
                    offerListing && offerListing.map((item) => (
                        <SwiperSlide key={item._id}>
                            <div style={{ background: `url(${item.imageUrls[0]}) no-repeat center`, backgroundSize: 'cover' }} className='h-[500px] ml-3 mb-8' >
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
                {
                    offerListing.length > 0 && (
                        <div>
                            <div className='my-3 ml-5 text-xl'>
                                <h2 className='text-2xl font-semibold text-slate-600'>Recent Offers</h2>
                                <Link className='text-sm text-blue-800 hover:underline' to={'/search?offer=true'}>Show More Offers</Link>
                            </div>
                            <div className='flex flex-wrap gap-6 ml-5'>
                                {
                                    offerListing.map((item) => (
                                        <Listitem listing={item} key={item._id} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                {
                    rentListing.length > 0 && (
                        <div>
                            <div className='my-3 ml-5 text-xl'>
                                <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Rent</h2>
                                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=rent'}>Show More Offers</Link>
                            </div>
                            <div className='flex flex-wrap gap-4'>
                                {
                                    rentListing.map((item) => (
                                        <Listitem listing={item} key={item._id} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                {
                    saleListing.length > 0 && (
                        <div>
                            <div className='my-3 ml-5 text-xl'>
                                <h2 className='text-2xl font-semibold text-slate-600'>Recent Places for Sale</h2>
                                <Link className='text-sm text-blue-800 hover:underline' to={'/search?type=sale'}>Show More Offers</Link>
                            </div>
                            <div className='flex flex-wrap gap-4'>
                                {
                                    saleListing.map((item) => (
                                        <Listitem listing={item} key={item._id} />
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Home;


