import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li><Link to='/'> Home </Link></li>
          <li><Link to='/folders'> My Folders </Link></li>
          <li><Link to='/tips'> Tips </Link></li>
          <li><Link to='/analytics'> Analytics </Link></li>
        </ul>
    </nav>
  </div>
  )
}

export default Navbar;