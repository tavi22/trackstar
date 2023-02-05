import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><NavLink to='/'> Home </NavLink></li>
          <li><NavLink to='/folders'> My Folders </NavLink></li>
          <li><NavLink to='/tips'> Tips </NavLink></li>
          <li><NavLink to='/analytics'> Analytics </NavLink></li>
        </ul>
    </nav>
  </div>
  )
}

export default Navbar;