// import React from 'react'
// import {  Link,useLocation, useNavigate } from "react-router-dom";
// const Navbar = (props) => {
//   let location = useLocation();
//   let navigate=useNavigate();
//   const handleLogout=()=>{
//     localStorage.removeItem('token');
//     navigate('/login')
//     props.showAlert("Will Meet Soon!!","success")
//   }
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//   <div className="container-fluid">
//     <Link className="navbar-brand" to="/">Navbar</Link>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//           <Link className={`nav-link ${location.pathname==="/" ? "active":""}`} aria-current="page" to="/">Home</Link>
//         </li>
//         <li className="nav-item">
//           <Link className={`nav-link ${location.pathname==="/about " ? "active":""}`} to="/about">About</Link>
//         </li>
//       </ul>
//       {!localStorage.getItem('token')?<div className="d-flex">
//         <Link className="btn btn-primary mx-2" to="/signup"  role="button">Sign Up</Link>
//         <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
//       </div>:<button onClick={handleLogout} className='btn btn-primary'>Logout</button>}
//     </div>
//   </div>
// </nav>
//   )
// }

// export default Na vbar

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
          <Link className='logo'  to='/'>Remember-Book</Link>
          <Link  className='l-nav-button'to="/">Home</Link>
          <Link className='l-nav-button' to="/about">About</Link>
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