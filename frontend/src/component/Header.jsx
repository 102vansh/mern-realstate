// import React from 'react'
// import {FaSearch} from "react-icons/fa"
// import { useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'

// const Header = () => {
//     const {user} = useSelector((state) => state.user)
//   return (
//     <header className='bg-slate-200 shadow-md' >
//     <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
// <Link to={"/"}>
//     <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
//         <span className='text-slate-500'>Vansh</span>
//         <span className='text-slate-700'>Estate</span>
//     </h1>
// </Link>
//     <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
//         <input type="text" placeholder="Search..." className='bg-transparent border-none outline-none focus:outline-none w-24 sm:w-64 '/>
//         <FaSearch className='text-slate-600'/>
//     </form>
//     <ul className='flex gap-4'>
//     <Link to={"/"}>
//         <li className='hidden sm:inline text-slate-700 hover:underline'>
//             Home
//         </li>
//     </Link>
//     <Link to={"/about"}>
//         <li className='hidden sm:inline text-slate-700 hover:underline'>
//             About
//         </li>
//     </Link>
//     <Link to={"/signin"}>
//     {user?<Link to={"/profile"}><img src={user.avatar} className='w-8 rounded-full'/></Link> :(

//         <li className='text-slate-700 hover:underline'>
//             Sign in
//         </li>
//     )}
        
//     </Link>
//     </ul>
//     </div>
//     </header>
//   )
// }

// export default Header

import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const { user } = useSelector((state) => state?.user?.user);
const[search,setsearch] = useState("")
const navigate = useNavigate()
const handelsubmit = (e) => {
  e.preventDefault()
  console.log(search)
  const urlparams = new URLSearchParams(window.location.search);
  urlparams.set('search', search);
  const searchquerry = urlparams.toString();
  navigate(`/?${searchquerry}`)
}

useEffect(() => {
  const urlparams = new URLSearchParams(window.location.search);
  const searchquerry = urlparams.get('search');
  setsearch(searchquerry)
}, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Vansh</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form onSubmit={handelsubmit} className="bg-slate-100 p-3 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none focus:outline-none w-24 sm:w-64"
            value={search}
            onChange={(e)=>setsearch(e.target.value)}
            // onClick={navigate(`/search?search=${search}`)}
          />
          <button> 
           <FaSearch type='submit' className="text-slate-600" />
          </button>
        
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">Home</li>
          </Link>
          <Link to="/about">
            <li className="hidden sm:inline text-slate-700 hover:underline">About</li>
          </Link>
          {user ? (
            <Link to="/profile">
              <img className="w-6 rounded-full" src={user.avatar} alt="profile" />
              
            </Link>
          ) : (
            <Link to="/signin">
              <li className="text-slate-700 hover:underline">Sign in</li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
