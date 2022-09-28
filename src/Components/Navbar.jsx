

import React from 'react'
import {  Link, useNavigate } from "react-router-dom";
import '../Styles/navbar.css'
const Navbar = (props) => {
  let navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login')
    props.showAlert("Will Meet Soon!!","success")
  }
  return (
    <>
      <div class="nav">
        <div class="nav-links">
          <Link className='logo'  to='/'>Rem-Book</Link>
          <Link  className='l-nav-button'to="/">Home</Link>
          <Link className='l-nav-button' to="/about">About</Link>
          <Link className='l-nav-button' to="/land">Land</Link>
          </div>
          {!localStorage.getItem('token')?
          <div className='right-button'>
            <Link className='nav-button' to="/signup">Sign Up</Link>
            <Link className='nav-button' to="/login">Login</Link>
          </div>
          :<button className='logout' onClick={handleLogout}>Logout</button>}
        </div>
      
    </>
  )
}

export default Navbar