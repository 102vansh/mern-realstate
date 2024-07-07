// import React, { useEffect, useState } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// const Contact = ({listing}) => {
//     const[landloard,setlandloard] = useState(null)
// const[message,setMessage] = useState('')

// useEffect(() => {
//    const fetchlandloard = async () => {
//     try {
//         const response = await axios.get(`http://localhost:5001/api/v1/user/get/${listing.userRef}`, { withCredentials: true })
//         console.log(response.data)
//         setlandloard(response.data.user)
//     } catch (error) {
//         console.log(error)
//     }
//    }
//    fetchlandloard()
// }, [listing.userRef])

// // const handelmessgae = (e) => {

// // }
//   return (
//     <div>
// {landloard && <div className='flex flex-col gap-4'>
//     <p>{landloard.username}
//     <span>{listing.name}</span></p>
//    <textarea name="message" id="message"  rows="2" onChange={(e) => setMessage(e.target.value)} value={message} className='w-full rounded-lg border p-3  ' placeholder='Your Message'></textarea>
// </div>}
// <Link  className='bg-slate-700 text-white p-3 rounded-lg hover:placeholder-opacity-95 uppercase' to={`mailto:${landloard?.email}?subject=${listing.name}&body=${message} `}>Send Message</Link>
//     </div>
//   )
// }

// export default Contact


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {
  const [landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchLandlord = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/v1/user/get/${listing.userRef}`, { withCredentials: true });
        console.log(response.data);
        setLandlord(response.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    fetchLandlord();
  }, [listing.userRef]);

  return (
    <div className="contact-container">
      { 
        <div className="flex flex-col gap-5 ml-6">
          <p className="font-semibold text-xl ml-5">
           Contact  {landlord?.username} 
            <span className='text-2xl font-bold '>  For  {listing?.name}</span>
          </p>
          <textarea
            name="message"
            id="message"
            rows="4"
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            className="w-full rounded-lg border p-3"
            placeholder="Your Message"
          ></textarea>
          <Link
        className="bg-slate-700 text-white p-3 rounded-lg hover:placeholder-opacity-95 text-center uppercase w-[50%] ml-[200px] mb-5"
        to={`mailto:${landlord?.email}?subject=${listing.name}&body=${message}`}
      >
        Send Message
      </Link>
        </div>
      }
      
    </div>
  );
};

export default Contact;
