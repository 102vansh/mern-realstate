import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../redux/UserSlice'
import { useNavigate } from 'react-router-dom'

const Oauth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
const handleclick = async() => {

    try{
const provider  = new GoogleAuthProvider()
const auth = getAuth(app)
const result =  await signInWithPopup(auth,provider)
console.log(result)
const res = await axios.post('http://localhost:5001/api/v1/user/auth/google',{email:result.user.email,username:result.user.displayName,photo:result.user.photoURL},{withCredentials:true})
console.log(res.data)
dispatch(loginSuccess(res.data))
navigate('/')
    }catch(error){
console.log(error)
    }
}

  return (
<button type='button' onClick={handleclick}  className='bg-red-600 text-white p-3 rounded-lg hover:placeholder-opacity-95 uppercase'>Continue With Google </button>
  )
}

export default Oauth