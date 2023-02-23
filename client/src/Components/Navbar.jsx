import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Styles/navbar.css";
import Navgif from "../Images/navgif.gif";
import { GiHamburgerMenu} from "react-icons/gi";
import { IoClose} from "react-icons/io5";
const Navbar = ({ openModal }) => {
  const [isMobile, setIsMobile] = useState(false)
  let navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <div className="nav">
        <div className="leftnav-box">
          <div className="nav-links">
            <Link className="logo" to="/">
              Vatsav
            </Link>
          </div>
          <div className="nav-flex-text-image">
            <img
              src={Navgif}
              alt=""
              style={{ height: "26px", margin: "4px 12px" }}
            />
            <p style={{ fontSize: "12px" }}>
              The Essential app for any human being
              <br /> who wants to make there time useful
            </p>
          </div>
        </div>
        <div className="rightnav-box">
          <Link className="l-nav-button" to="/">
            Home
          </Link>
          <Link className="l-nav-button" to="/notes">
            Notes
          </Link>
          <div className="vl"></div>
          {!localStorage.getItem("token") ? (
            <div className="right-button">
              <Link className="btn-back" to="/signup">
                Sign Up
              </Link>
              <Link
                className="nav-button"
                to="/login"
                onClick={() => {
                  openModal(true);
                }}
              >
                Login
              </Link>
            </div>
          ) : (
            <button className="logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>


      {/* This is sidebar */}
      <div className={isMobile?"mobile":"mob-main-box"}>
      <div className="mob-nav">
     
          <Link id="nav-one-color" className="mob-l-nav-button" to="/" onClick={()=>setIsMobile(false)}>
            Home
          </Link>
          <Link id="nav-two-color" className="mob-l-nav-button" to="/notes" onClick={()=>setIsMobile(false)}>
            Notes
          </Link>
          {!localStorage.getItem("token") ? (
            <div className="mob-right-button">
              <div id="mob-nav-account">Accounts</div>
              <Link className="mob-btn-back" to="/signup" onClick={()=>setIsMobile(false)}>
                Sign Up
              </Link>
              <Link
                className="mob-nav-button"
                to="/login"
                onClick={() => {
                  openModal(true);
                }}
              >
                Login
              </Link>
            </div>
          ) : (
            <button className="mob-logout" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
      <button className="mobile-menu-icon" onClick={()=>setIsMobile(!isMobile)}>
      {!isMobile? <GiHamburgerMenu size={30}/>:<IoClose size={30}/>}
    </button>
    </>
  );
};

export default Navbar;
