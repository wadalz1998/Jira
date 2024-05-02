import React from 'react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
  return (
      <div className='container'>
      <div className='row p-3'>
        <NavLink className={'col-6 '} to={'/'}><img src='https://static.topcv.vn/company_logos/z1sHNTFwtLk5Zov3quFddxbhrglLYd4i_1663151222____2af398221de2ba2d92dddc58724ce19e.jpeg' style={{ width: '90px' }} /></NavLink>
        <div className='col-5 align-content-center'>
          <NavLink className={'nav-link'} to={'/'} ><h1 style={{ fontSize: '16px' }}>CyberLearn.vn</h1></NavLink>
          <NavLink className='nav-link link-dark' to={'/'} style={{ fontSize: '12px' }}>Report bug</NavLink>
        </div>
      </div>
      <div className='pt-3'>
        <NavLink className='nav-link link-dark p-2' to={'/'}> <i className="fa-solid fa-server"></i> Cyber Board</NavLink>
        <NavLink className='nav-link link-dark p-2' to={'/project-management'}> <i className="fa-solid fa-gear"></i> Project management</NavLink>
        <NavLink className='nav-link link-dark p-2' to={'/create-project'}> <i className="fa-solid fa-gear"></i> Create Project</NavLink>
      </div>
      <hr />
      <div className='pt-3'>
        <NavLink className='nav-link link-dark p-2' to={'/releases'}> <i className="fa-solid fa-truck"></i> Release</NavLink>
        <NavLink className='nav-link link-dark p-2' to={'/issues-and-filters'}> <i className="fa-solid fa-equals"></i> Issues and filters</NavLink>
        <NavLink className='nav-link link-dark p-2' to={'/pages'}> <i className="fa-solid fa-paste"></i> Pages</NavLink>

        <NavLink className='nav-link link-dark p-2' to={'/reports'}> <i className="fa-solid fa-location-arrow"></i> Reports</NavLink>
        <NavLink className='nav-link link-dark p-2' to={'/component'}> <i className="fa-solid fa-box"></i> Components</NavLink>
      </div>
    </div>

  )
}

export default NavBar