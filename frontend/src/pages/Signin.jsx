import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import toast,{Toaster} from 'react-hot-toast'
import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginSuccess } from '../redux/UserSlice'
import Oauth from '../component/Oauth'
const Signin = () => {
    const navigate  = useNavigate()
    const dispatch = useDispatch()
    const [formdata,setformdata] = useState({})
    const[loading,setloading] = useState(false)
        const handlechange = (e) => {
    setformdata({...formdata,[e.target.id]:e.target.value})
    
        }
    
        const handlesubmit = async(e) => {
            e.preventDefault()
        try{
            setloading(true)
    const response = await axios.post(' http://localhost:5001/api/v1/user/login',formdata,{withCredentials:true})
       
    console.log(response.data)
    dispatch(loginSuccess(response.data))
    toast.success(response.data.message)
    setloading(false)
    navigate('/')
        }catch(err){
            toast.error(err.response.data.message)
            console.log(err)
            setloading(false)
        }
        }
      return (
        <div className='p-3 max-w-lg mx-auto'>
            <h1 className='text-slate-700 text-3xl text-center font-bold mt-7'>Login</h1>
            <form onSubmit={handlesubmit} className='flex flex-col gap-4 mt-9 ' >
                {/* <input type = "text" placeholder="username" className='border p-3 rounded-lg' id = 'username' onChange={handlechange} /> */}
                <input type = "email" placeholder="Email" className='border p-3 rounded-lg' id = 'email' onChange={handlechange} />
                <input type = "password" placeholder="password" className='border p-3 rounded-lg' id = 'password' onChange={handlechange} />
    <button className='bg-slate-700 text-slate-100  rounded-lg p-3 uppercase hover:opacity-95 disabled::opacity-80'>{loading?'loading...':'Login'}</button>
    <Oauth/>
    <div className='mt-3'>
        <Link to={'/signout'}>  Create an account?<span className='text-blue-700 ml-2 font-semibold'>Sign up</span> </Link>
    </div>
    <Toaster />
            </form>
        </div>
      )
    }
    
    

export default Signin