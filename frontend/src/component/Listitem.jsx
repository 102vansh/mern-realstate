// import React from 'react'
// import { Link } from 'react-router-dom'
// import {MdLocationOn} from 'react-icons/md'
// const Listitem = ({listing}) => {
//   return (
//     <div className='bg-white flex flex-col gap-4 w-full  '>
//         <Link to={`/listing/${listing._id}`}>
//             <img src={listing.imageUrls[0]} alt="" className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-shadow overflow-hidden rounded-lg' />
//             <div className='p-3 flex flex-col gap-3 '>
// <p className='text-lg font-semibold text-slate-700'>{listing.name}</p>
// <div className='flex items-center gap-2'>
// <MdLocationOn className='text-red-500 h-4 w-4'/>
// <p className='text-sm text-gray'>{listing.address}</p>
// <div>
//     <p className='text-sm text-gray'>{listing.description}</p>
// <p>
//     {listing.offer ? listing.discountedprice.toLocalString('en-US', {style: 'currency', currency: 'USD'}) : listing.regularprice.toLocalString('en-US', {style: 'currency', currency: 'USD'})}
//     </p>
//     <div className='text-slate-500'>
//     <div className='font-bold text-xs'>

//     {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `${listing.bathrooms} Bathroom`}

//     </div>
//     <div className='font-bold text-xs'>

//     {listing.bathrooms > 1 ? `${listing.bathrooms} Bathrooms` : `${listing.bathrooms} Bathroom`}

//     </div>

//     </div>
// </div>


// </div>

//             </div>
//         </Link>
//     </div>
//   )
// }

// export default Listitem


import React from 'react';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';

const Listitem = ({ listing }) => {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden w-full sm:w-[340px]'>
      <Link to={`/listing/${listing._id}`}>
        <img 
          src={listing.imageUrls[0]} 
          alt="" 
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' 
        />
        <div className='p-3 flex flex-col gap-3'>
          <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
          <div className='flex items-center gap-2'>
            <MdLocationOn className='text-red-500 h-4 w-4' />
            <p className='text-sm text-gray'>{listing.address}</p>
          </div>
          <div>
            <p className='text-sm text-gray line-clamp-2'>{listing.description}</p>
            <p className='text-slate-500 mt-2 font-semibold'>
            
              {listing.offer 
                ? listing.discountedprice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) 
                : listing.regularprice.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                {listing.type === 'rent' && ' / month'}
            </p>
            <div className='text-slate-700 flex gap-4'>
              <div className='font-bold text-xs'>
                {listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} Bath`}
              </div>
              <div className='font-bold text-xs'>
                {listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} Bed`}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Listitem;
