import React, { useState } from "react";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Styles/newlogin.css";
import Spinner from "./Spinner";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
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
    const { name, email, password, cpassword } = credentials;
    setLoader(true);
    const response = await fetch(
      `http://localhost:5000/api/auth/createuser`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
      }
    );
    const json = await response.json();

    setLoader(false);
    console.log(json);
    if (json.success) {
      e.preventDefault();
      navigate("/login");
    }

    if (json.success) {
      //save auth-token and redirect
      localStorage.setItem("token", json.authToken);
      props.showAlert("You are successfully Logged in!", "success");
      navigate("/notes");
    } else {
      props.showAlert("Check Your Credentials!", "danger");
    }
  };

  return (
    <>
      {loader && <Spinner />}
      <div className="modal-background">
        <div className="form-modal">
          <div className="modal-title">
            <button className="cross-btn" onClick={handleClick}>
              X
            </button>

            <div className="inner-container">
              <h1 className="head-1">Sign Up</h1>
              <p className="head-2">Create free Account with your email</p>
            </div>
          </div>
          <div className="modal-body">
            <div className="modal-subbody">
              <form action="" onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={credentials.name}
                  name="name"
                  id="name"
                  className="form-input"
                  placeholder="Enter your Name"
                  onChange={onchange}
                  required
                />
                <input
                  type="email"
                  className="form-input"
                  value={credentials.email}
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={onchange}
                  required
                />
                <input
                  type="password"
                  value={credentials.password}
                  name="password"
                  id="password"
                  className="form-input"
                  placeholder="Password"
                  onChange={onchange}
                  required
                />
                <input
                  type="password"
                  value={credentials.cpassword}
                  name="cpassword"
                  id="cpassword"
                  className="form-input"
                  placeholder="Confirm Password"
                  onChange={onchange}
                  required
                />
                <button className="submit-btn">Create your free Account</button>
              </form>
            </div>
            <p className="small-btn">
              By continuing , you agree to our{" "}
              <a href="#">Terms and Condition</a> <br /> Read our
              <a href=""> Privacy Policy.</a>
            </p>
          </div>
          <div className="modal-footer">
            Already have an account? <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
