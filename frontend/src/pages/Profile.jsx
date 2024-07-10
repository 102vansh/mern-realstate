// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { getDownloadURL } from 'firebase/storage'
// import { useState } from 'react'

// import { useDispatch, useSelector } from 'react-redux'
// import { deleteuser, logoutuser, updateuser } from '../redux/UserSlice'
// import { Link, useNavigate } from 'react-router-dom'
// import toast,{ Toaster } from 'react-hot-toast'
// import { getStorage, ref, uploadBytesResumable } from 'firebase/storage'
// import { app } from '../firebase'

// const Profile = () => {
//     const fileref = React.useRef()
//     const dispatch = useDispatch()
//     const navigate = useNavigate()
//     const[file,setfile] = useState(undefined)
//     const[fileperc,setfileperc] = useState(0)
//     const[formdata,setformdata] = useState({})

//     const {user} = useSelector((state) => state.user.user)
//     const [listing, setlisting] = React.useState([])
//     console.log(formdata)
//     console.log(fileperc)
// const handeldelete = async() => {
//     try{
// const response = await axios.delete(`http://localhost:5001/api/v1/user/delete/${user._id}`,{withCredentials:true},)
// console.log(response.data)
// toast.success(response.data.message)
// dispatch(deleteuser(response.data))
//     }catch(error){
// console.log(error)
//     }
// }

// const logouthandler = async() => {
//     try{
// const response = await axios.get('http://localhost:5001/api/v1/user/logout',{withCredentials:true})
// console.log(response.data)
// toast.success(response.data.message)
// navigate('/signin')
// dispatch(logoutuser(response.data))
//     }catch(error){
// console.log(error)
//     }
// }
// const showlisting = async() => {
//     try{
// const response = await axios.get('http://localhost:5001/api/v1/list/mylisting',{withCredentials:true})
// console.log(response.data)
// setlisting(response.data.listings)
//     }catch(error){
// console.log(error)
//     }
// }
// const deletelisting = async(id) => {
//     try{
// const response = await axios.delete(`http://localhost:5001/api/v1/list/deletelist/${id}`,{withCredentials:true})
// console.log(response.data)
// toast.success(response)

//     }catch(error){
// console.log(error)
//     }
// }

// const uploadfile = async() => {
//     const storage = getStorage(app)
//      const fileName = new Date().getTime() 
//     const storageRef = ref(storage, fileName)
//     const uploadTask = uploadBytesResumable(storageRef, file)
//     uploadTask.on('state_changed', (snapshot) => {
//         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//         setfileperc(Math.round(progress))
//         console.log('Upload is ' + progress + '% done')
//     }, (error) => {
//         console.log(error)
//     }, () => {
//         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
//             console.log('File available at', downloadURL)
//             setformdata({ ...formdata, avatar: downloadURL })
//         })
//     })
// }

// const handelchange = (e) => {
//     setformdata({ ...formdata, [e.target.id]: e.target.value })
// }
// const handelupdate = async() =>{
// try{
// const response = await axios.post(`http://localhost:5001/api/v1/user/update/${user._id}`,formdata,{withCredentials:true})
// console.log(response.data)
// toast.success(response.data.message)
// dispatch(updateuser(response.data))
// }catch(error){
//     console.log(error)
// }
// }
// useEffect(() => {
//     // showlisting()
//     uploadfile(file)
// }, [file])

//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//         <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

// <form onSubmit={handelupdate} className='flex flex-col gap-3'>
// <input onChange={(e) => setfile(e.target.files[0])} type='file' hidden ref={fileref} className=''/>
// <img onClick={() => fileref.current.click()} src={user.avatar} className='h-24 w-24 object-cover cursor-pointer self-center mt-2 rounded-full'></img>
// <p>{fileperc>0 && fileperc<100 ? ` uploading...${fileperc}%` : ''}</p>
// <input type='text' placeholder='Username' className='p-3 rounded-lg border '
// defaultValue={user.username} id='username' onChange={handelchange}/>
// <input type='email' placeholder='Email' className='p-3 rounded-lg border' defaultValue={user.email} id='email' onChange={handelchange}/>
// <input type='password'  placeholder='Password' className='p-3 rounded-lg border' id='password' onChange={handelchange}/>
// <button type='submit' className='p-3 bg-slate-700 text-white rounded-lg uppercase disabled:opacity-80'>Update</button>
// <Link className='bg-green-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-90' to={'/createlist'}>Create Listing </Link>
// </form>
// <div className='flex justify-between mt-5'>
//     <span className='text-red-700 cursor-pointer' onClick={handeldelete}>Delete Account</span>
//     <span onClick={logouthandler} className='text-red-700 cursor-pointer'>Signout</span>
// </div>
// <Toaster/>
// <button onClick={showlisting} className='p-3 bg-green-700 text-center text-white rounded-lg uppercase disabled:opacity-80 ml-[50%] mt-7'>Show Listing</button>

// {
//     listing.length > 0 && listing.map((item,index) => {
//         return(
//             <div key={index} className='mt-5 flex justify-between'>
//              <Link to={`/list/${item._id}`} className='text-blue-700 hover:underline'>   <h1 className='text-2xl font-medium'>{item.name}</h1>
//                 <p>{item.description}</p>
//                 </Link>
//                 <div className='flex flex-col gap-2'>
//                 <button>Edit</button>
//         <button onClick={()=>deletelisting(item._id)}>Delete</button>
//             </div>
//             </div>
//         )
//     })
// }
//     {/* </div> */}

//     </div>
//   )
// }

// export default Profile




import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { deleteuser, logoutuser, updateuser } from '../redux/UserSlice';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { app } from '../firebase';

const Profile = () => {
  const fileref = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setfile] = useState(null);
  const [fileperc, setfileperc] = useState(0);
  const [formdata, setformdata] = useState({});
  const { user } = useSelector((state) => state.user.user);
  const [listing, setlisting] = useState([]);
  
  const handeldelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/v1/user/delete/${user._id}`, { withCredentials: true });
      toast.success(response.data.message);
      dispatch(deleteuser(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const logouthandler = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/v1/user/logout', { withCredentials: true });
      toast.success(response.data.message);
      navigate('/signin');
      dispatch(logoutuser(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  const showlisting = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/v1/list/mylisting', { withCredentials: true });
      setlisting(response.data.listings);
    } catch (error) {
      console.log(error);
    }
  };

  const deletelisting = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/v1/list/deletelist/${id}`, { withCredentials: true });
      toast.success(response.data.message);
      setlisting(listing.filter(item => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const uploadfile = async () => {
    if (!file) return;
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setfileperc(Math.round(progress));
    }, (error) => {
      console.log(error);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setformdata({ ...formdata, avatar: downloadURL });
      });
    });
  };

  const handelchange = (e) => {
    setformdata({ ...formdata, [e.target.id]: e.target.value });
  };

  const handelupdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5001/api/v1/user/update/${user._id}`, formdata, { withCredentials: true });
      toast.success(response.data.message);
      dispatch(updateuser(response.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (file) {
      uploadfile();
    }
  }, [file]);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handelupdate} className='flex flex-col gap-3'>
        <input onChange={(e) => setfile(e.target.files[0])} type='file' hidden ref={fileref} />
        <img
          onClick={() => fileref.current.click()}
          src={user.avatar}
          className='h-24 w-24 object-cover cursor-pointer self-center mt-2 rounded-full'
          alt='Avatar'
        />
        <p>{fileperc > 0 && fileperc < 100 ? `Uploading... ${fileperc}%` : ''}</p>
        <input
          type='text'
          placeholder='Username'
          className='p-3 rounded-lg border'
          defaultValue={user.username}
          id='username'
          onChange={handelchange}
        />
        <input
          type='email'
          placeholder='Email'
          className='p-3 rounded-lg border'
          defaultValue={user.email}
          id='email'
          onChange={handelchange}
        />
        <input
          type='password'
          placeholder='Password'
          className='p-3 rounded-lg border'
          id='password'
          onChange={handelchange}
        />
        <button type='submit' className='p-3 bg-slate-700 text-white rounded-lg uppercase disabled:opacity-80'>
          Update
        </button>
        <Link className='bg-green-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-90' to={'/createlist'}>
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer' onClick={handeldelete}>Delete Account</span>
        <span onClick={logouthandler} className='text-red-700 cursor-pointer'>Sign out</span>
      </div>
      <Toaster />
      <button onClick={showlisting} className='text-green-700 w-full'>
        Show Listing
      </button>
      {/* {listing.length > 0 && listing.map((item, index) => (
        <div key={index} className='mt-5 flex justify-between'>
          <Link to={`/listing/${item._id}`} className='text-blue-700 hover:underline'>
            <img src={item.imageUrls[0]} className='h-24 w-24 object-cover cursor-pointer self-center mt-2 rounded-full' alt='Avatar' />
          </Link>
          <div className='flex flex-col gap-2'>
         <Link  to={`/updatelist/${item._id}`}> <button className='text-green-700'>Edit</button>
         </Link>
            <button className='text-red-700' onClick={() => deletelisting(item._id)}>Delete</button>
          </div>
        </div>
      ))} */}


{listing ==0 && <h1 className='text-center mt-7 text-2xl font-semibold'>No Listing...</h1>}
      {listing &&listing.length > 0 && (
        <div className='flex flex-col gap-4'>
          <h1 className='text-center mt-7 text-2xl font-semibold'>
            Your Listings
          </h1>
          {listing.map((listing) => (
            <div
              key={listing._id}
              className='border rounded-lg p-3 flex justify-between items-center gap-4'
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  src={listing.imageUrls[0]}
                  alt='listing cover'
                  className='h-16 w-16 object-contain'
                />
              </Link>
              <Link
                className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className='flex flex-col item-center'>
                <button
                  onClick={() => deletelisting(listing._id)}
                  className='text-red-700 uppercase'
                >
                  Delete
                </button>
                <Link to={`/updatelist/${listing._id}`}>
                  <button className='text-green-700 uppercase'>Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
