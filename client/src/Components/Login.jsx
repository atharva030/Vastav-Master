import React, { useState } from "react";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Styles/newlogin.css";
import { BsGoogle, BsApple } from "react-icons/bs";
import Google from "./Google";
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
    setLoader(false);

    const json = await response.json();
    setLoader(true);

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
      <div className="modal-background">
        <div className="modal-element">
          <div className="modal-title" onSubmit={handleSubmit}>
            <button className="cross-btn" onClick={handleClick}>
              X
            </button>

            <div className="inner-container">
              <h1 className="head-1">Hello!</h1>
              <p className="head-2">
                Use your email or another services to <br />
                continue with Vatsav
              </p>
            </div>
          </div>
          <div className="modal-body-login">
            <div className="modal-subbody">
              <a href="#" style={{ textDecoration: "none" }}>
                <button className="i-btn-grey" disabled>
                  <BsGoogle />
                  Continue with Google
                </button>
              </a>
              <a href="#" style={{ textDecoration: "none" }}>
                <button className="i-btn-grey">
                  <BsApple />
                  Continue with Apple
                </button>
              </a>
              <Link to="/signin" style={{ textDecoration: "none" }}>
                <button className="i-btn">Continue with Email</button>
              </Link>
            </div>
            <p className="small-btn">
              By continuing , you agree to our{" "}
              <a href="#">Terms and Condition</a> <br /> Read our
              <a href=""> Privacy Policy.</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
