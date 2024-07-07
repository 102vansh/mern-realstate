import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const Privateroute = () => {
    const {user} = useSelector((state) => state.user.user)
  return (
    user ? <Outlet /> : <Navigate to="/signin" />
  )
}

export default Privateroute

