// import React, { useEffect, useState } from 'react'

// const Search = () => {
//     const[sidebar,setsidebar] = useState({
//         searc:'',
//         type:'all',
//         parking:false,
//         furnished:false,
//         offer:false,
//         sort:'created_at',
//         order:'desc'

//     })
//     useEffect(() => {
//         const utlparams = new URLSearchParams(window.location.search)
//         const sarchfromurl = utlparams.get('search')
//         const typefromurl = utlparams.get('type')
//         const sortfromurl = utlparams.get('sort')
//         const orderfromurl = utlparams.get('order')
//         const parkingfromurl = utlparams.get('parking')
//         const furnishedfromurl = utlparams.get('furnished')
//         const offerfromurl = utlparams.get('offer')

//         setsidebar((prev)=>({...prev,search:sarchfromurl,type:typefromurl,parking:parkingfromurl,furnished:furnishedfromurl,offer:offerfromurl,sort:sortfromurl,order:orderfromurl}))
//         const fetchlist = async () => {
//             try {
//                 const searchquerry = utlparams.toString()
//                 const response = await axios.get(`http://localhost:5001/api/v1/list/get${searchquerry}`, { withCredentials: true })
//                 console.log(response.data)
//                 setlisting(response.data.listing)
//             } catch (error) {
//                 console.error("Error fetching listing:", error)
//             }
//         }
//         fetchlist()
//     }, [location.search])
//     const handelchange = (e) => {
//         if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
//             setsidebar((prev)=>({...prev,type:e.target.id}))
//         }
//         if(e.target.id == 'search'){
//             setsidebar((prev)=>({...prev,search:e.target.value}))
//         }
//         if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
//             setsidebar(...sidebar, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false)
//         }
//         if(e.target.id === 'sort' ){
// const sort = e.target.value.split('-')[0] || 'created_at'
// const order = e.target.value.split('-')[1] || 'desc'
//             setsidebar((prev)=>({...prev,sort,order}))
//         }
//     }
//     const handelsubmit = (e) => {
//         e.preventDefault()
//     const utlparams = new URLSearchParams(window.location.search)
//     utlparams.set('search', sidebar.search)
//     utlparams.set('type', sidebar.type)
//     utlparams.set('parking', sidebar.parking)
//     utlparams.set('furnished', sidebar.furnished)
//     utlparams.set('offer', sidebar.offer)
//     utlparams.set('sort', sidebar.sort)
//     utlparams.set('order', sidebar.order)
//     const searchquerry = utlparams.toString()
//     navigate(`/?${searchquerry}`)
//     }
//     console.log(sidebar)

//   return (
//     <div className='flex flex-col md:flex-row'>
//         <div className='p-7 border-bottom-b-2 sm:border-r-2 md:min-h-screen'>
//             <form onSubmit={handelsubmit} className='flex flex-col gap-8' >
//                 <div className='flex items-center gap-2'>
//                 <label className='whitespace-nowrap'>Search Term </label>
//                 <input type="text" id  ="search" placeholder='Search'  className='border rounded-lg w-full p-3' value={sidebar.search} onChange={handelchange}/>
//                 </div>
//                 <div className='flex gap-2 flex-wrap items-center'>
//                     <label>Type:</label>
//                     <div className='flex gap-2 '>
//                         <input type='checkbox' id='all' className='w-5' onChange={handelchange} checked={sidebar.type==='all'}/>
//                         <span>Rent & Sale</span>
//                     </div>
//                     <div className='flex gap-2 '>
//                         <input type='checkbox' id='rent' className='w-5' onChange={handelchange} checked={sidebar.type==='rent'}/>
//                         <span>Rent</span> 
//                     </div>
//                     <div className='flex gap-2 '>
//                         <input type='checkbox' id='sale' className='w-5' onChange={handelchange} checked={sidebar.type==='sale'}/>
//                         <span> Sale</span>
//                     </div>
//                     <div className='flex gap-2 '>
//                         <input type='checkbox' id='offer' className='w-5' onChange={handelchange} checked={sidebar.type==='offer'}/>
//                         <span>Offer</span>
//                     </div> 
                    

//                 </div>
//                 <div className='flex gap-2 flex-wrap items-center'>
//                     <label>Amenities</label>
//                     <div className='flex gap-2 '>
//                         <input type='checkbox' id='parking' className='w-5' onChange={handelchange} checked={sidebar.parking} />
//                         <span>Parking</span>
//                     </div>
//                     <div className='flex gap-2 '>
//                         <input type='checkbox' id='furnished' className='w-5' onChange={handelchange} checked={sidebar.furnished}/>
//                         <span>Furnished</span>
//                     </div>
                   

//                 </div>

//                 <div className='flex items-center gap-2'>

//                         <label>Sort:</label>
//                         <select id='sort' className='border-rounded-lg  p-3' defaultChecked={'created_at_desc'}>
// <option value='regular-price_desc' >Price High To Low</option>
// <option value='regular-price_asc' >Price Low To High</option>
// <option value='created_at_desc' >Newest</option>
// <option value='created_at_asc' >Oldest</option>


//                         </select>
//                     </div>
                
// <button className='bg-slate-500 text-white p-3 rounded-lg'> Search</button>
//             </form>
//         </div>
//         <div className=''>
//             <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Listing Result</h1>
//         </div>
//     </div>
//   )
// }

// export default Search


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Listitem from '../component/Listitem';
const Search = () => {
  const [sidebar, setSidebar] = useState({
    search: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });
  const [listing, setListing] = useState([]);
  const [showmore, setShowmore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchFromUrl = urlParams.get('search') || '';
    const typeFromUrl = urlParams.get('type') || 'all';
    const sortFromUrl = urlParams.get('sort') || 'created_at';
    const orderFromUrl = urlParams.get('order') || 'desc';
    const parkingFromUrl = urlParams.get('parking') === 'true';
    const furnishedFromUrl = urlParams.get('furnished') === 'true';
    const offerFromUrl = urlParams.get('offer') === 'true';

    setSidebar((prev) => ({
      ...prev,
      search: searchFromUrl,
      type: typeFromUrl,
      parking: parkingFromUrl,
      furnished: furnishedFromUrl,
      offer: offerFromUrl,
      sort: sortFromUrl,
      order: orderFromUrl,
    }));

    const fetchList = async () => {
      try {
        const searchQuery = urlParams.toString();
        const response = await axios.get(`http://localhost:5001/api/v1/list/get?${searchQuery}`, { withCredentials: true });
        console.log(response.data);
        if(response.data.listings.length>9){
            setShowmore(true)
        }else{
            setShowmore(false)
        }
        setListing(response.data.listings);
      } catch (error) {
        console.error('Error fetching listing:', error);
      }
    };

    fetchList();
  }, [window.location.search]);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setSidebar((prev) => ({
        ...prev,
        [id]: checked,
      }));
    } else if (id === 'sort') {
      const [sort, order] = value.split('_');
      setSidebar((prev) => ({
        ...prev,
        sort,
        order,
      }));
    } else {
      setSidebar((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    Object.keys(sidebar).forEach((key) => {
      urlParams.set(key, sidebar[key]);
    });
    const searchQuery = urlParams.toString();
    navigate(`/?${searchQuery}`);
  };
const onshowmore = async() => {
const numberoflisting = listing.length
const startindex = numberoflisting
const urlparams = new URLSearchParams(window.location.search);
urlparams.set('startindex', startindex);
const searchQuery = urlparams.toString();
const response = await axios.get(`http://localhost:5001/api/v1/list/get?${searchQuery}`, { withCredentials: true });
if(response.data.listings.length<9){
    setShowmore(false)
}
setListing((prev)=>([...prev,...response.data.listings]))

}

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-bottom-b-2 sm:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap">Search Term </label>
            <input
              type="text"
              id="search"
              placeholder="Search"
              className="border rounded-lg w-full p-3"
              value={sidebar.search}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Type:</label>
            <div className="flex gap-2">
              <input
                type="radio"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebar.type === 'all'}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebar.type === 'rent'}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebar.type === 'sale'}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebar.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label>Amenities</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebar.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebar.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label>Sort:</label>
            <select id="sort" className="border-rounded-lg p-3" onChange={handleChange} value={`${sidebar.sort}_${sidebar.order}`}>
              <option value="regular-price_desc">Price High To Low</option>
              <option value="regular-price_asc">Price Low To High</option>
              <option value="created_at_desc">Newest</option>
              <option value="created_at_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-500 text-white p-3 rounded-lg">Search</button>
        </form>
      </div>
      <div className="p-7">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">Listing Result</h1>
       <div className='p-7 '>
{listing?.length === 0 && (
          <p>No listings found.</p>
        )}

        {listing?.map((item) => (
          <Listitem listing={item} key={item._id} />
        ))}
        {showmore && (
            <button className='text-green-700 text-center'  onClick={() => onshowmore()}>

            </button>
        )}
       </div>
      </div>
    </div>
  );
};

export default Search;

