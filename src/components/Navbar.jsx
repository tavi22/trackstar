import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../img/trackstar_logo.png'

const Navbar = () => {
  return (
    <div className='container-fluid mt-3'>
      <nav className="navbar navbar-expand-lg bg-light navbar-light" >
        <div className='container'>
          <a className="navbar-brand" href="/">
            <img src={logo} alt="" width="120" height="100" />
          </a>
        </div>
        <NavLink className='navbar-brand ms-auto' to='/' style={{ textDecoration: 'inherit', color: 'inherit'}}> Home </NavLink>
        <NavLink className='navbar-brand' to='/folders' style={{ textDecoration: 'inherit', color: 'inherit' }}> Folders </NavLink>
        <NavLink className='navbar-brand' to='/tips' style={{ textDecoration: 'inherit', color: 'inherit' }}> Tips </NavLink>
        <NavLink className='navbar-brand' to='/analytics' style={{ textDecoration: 'inherit', color: 'inherit' }}> Analytics </NavLink>
      </nav>
    </div>

  )
}

export default Navbar;