import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Routes, Route} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signout from './pages/Signout'
import Signin from './pages/Signin'
import About from './pages/About'
import Header from './component/Header'
import Privateroute from './component/Privateroute'
import Createlist from './pages/Createlist'
import Updatelist from './pages/Updatelist'
import Listing from './pages/Listing'
import Search from './pages/Search'
const App = () => {
  return (
    <div >
<BrowserRouter>

<Header/>
<Routes>
  <Route path="/" element={<Home/>} />
  <Route element = {<Privateroute/>}>
  <Route path='/profile' element={<Profile/>} />
  <Route path = '/createlist' element={<Createlist/>}></Route>
  <Route path='/updatelist/:listingid' element = {<Updatelist/>}/>
  </Route>
  <Route path='/listing/:listingid' element={<Listing/> }></Route>
  <Route path='/signout' element={<Signout/>}></Route>
<Route path='/signin' element={<Signin/>}></Route>
<Route path='/about' element={<About/>}></Route>
<Route path='/search' element={<Search/>}></Route>
</Routes>
<Toaster/>
</BrowserRouter>
    </div>
  )
}

export default App