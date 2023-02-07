import React, { useState } from "react";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Styles/newlogin.css";
import Spinner from './Spinner'
const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const [loader, setLoader] = useState(false);
  
    const onchange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value }); //this is mainly use to reflect the change in words on frontend
    };
    const handleClick = () => {
      props.closeModal(false);
      navigate("/"); 
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoader(true);
      const response = await fetch(
        `https://atharva-jagdale.herokuapp.com/api/auth/login`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }), // body data type must match "Content-Type" header
        }
      );
  
      const json = await response.json();
      setLoader(false);
  
      if (json.success) {
        //save auth-token and redirect
        localStorage.setItem("token", json.authToken);
        props.showAlert("You are successfully Logged in!", "success");
        navigate("/");
      } else {
        props.showAlert("Check Your Credentials!", "danger");
      }
    };
  
  return (
    <>
{loader && <Spinner/>}
      <div className="modal-background">
        <div className="form-modal">
          <div className="modal-title">
            <button className="cross-btn" onClick={handleClick}>
              X
            </button>

            <div className="inner-container">
              <h1 className="head-1">Sign In</h1>
              <p className="head-2">Sign In with your Email</p>
            </div>
          </div>
          <div className="modal-body">
            <div className="modal-subbody">
              <form onSubmit={handleSubmit}>
           
                <input
                  type="email"
                  className="form-input"
                  value={credentials.email}
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={onchange} 
                />
                <input
                  type="password"
                  value={credentials.password}
                  name="password"
                  id="password"
                  className="form-input"
                  placeholder="Password"
                  onChange={onchange}
                />
              
                <button className="submit-btn">Sign In</button>
              </form>
            </div>
            <p className="small-btn">
              By continuing , you agree to our
              <a href="#">Terms and Condition</a> <br /> Read our
              <a href=""> Privacy Policy.</a>
            </p>
          </div>
          <div className="modal-footer">
            Already have an account? <Link to="/signup">Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
