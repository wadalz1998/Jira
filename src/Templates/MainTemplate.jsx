import React from 'react'
import Header from '../Components/Header'
import NavBar from '../Components/NavBar'
import { Outlet } from 'react-router-dom'

const MainTemplate = () => {
  return (
    <div className='row w-100 h-100'>
      <div className='col-1' id='header' style={{height:'100vh', backgroundColor:'#00152A'}}>
        <Header/>
      </div>
      <div className='col-2 bg-body-secondary' id='nav-bar' style={{height:'100vh'}}>
        <NavBar/>
      </div>
      <div className='col-9' style={{height:'100vh'}}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default MainTemplate