import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div className="panel-group ">
      <div className="panel panel-default">
        <div className="panel-heading">
          <h4 className="panel-title text-end" >
            <a data-bs-toggle="collapse" href="#collapse1"><i className="fa-solid fa-bars"></i></a>
          </h4>
        </div>
        <div id="collapse1" className="panel-collapse show">
          <ul className="list-group">
          <NavLink className='nav-link link-light p-2' to={'/'}> <i className="fa-solid fa-plus"></i> Create tasks</NavLink>
          <NavLink className='nav-link link-light p-2' to={'/'}> <i className="fa-solid fa-magnifying-glass"></i> Search</NavLink>
          </ul>
        </div>
      </div>
    </div>

  )
}

export default Header