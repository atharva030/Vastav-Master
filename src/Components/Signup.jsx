// import React, { useState } from "react";
// import "../Styles/login.css";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import Spinner from "./Spinner";

// const Signup = (props) => {
//   let navigate = useNavigate();

//   const [credentials, setCredentials] = useState({
//     name: "",
//     email: "",
//     password: "",
//     cpassword: "",
//   });
//   const handleClick=()=>{
//     props.closeModal(false);
//     navigate('/')
//   }
//   const [loader, setLoader] = useState(false);
//   const onchange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value }); //this is mainly use to reflect the change in words on frontend
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (credentials.password === credentials.cpassword) {
//       const { name, email, password } = credentials;
//       setLoader(true);
//       const response = await fetch(
//         `https://atharva-jagdale.herokuapp.com/api/auth/createuser`,
//         {
//           method: "POST", // *GET, POST, PUT, DELETE, etc.
//           headers: {
//             "Content-Type": "application/json",
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: JSON.stringify({ name, email, password }), // body data type must match "Content-Type" header
//         }
//       );
//       const json = await response.json();
//       setLoader(false);
//       console.log(json);
//       if (json.success) {
//         e.preventDefault();
//         // props.showAlert("Account Created Successfully!!", "success");
//         navigate("/login");
//       }
//       // } else {
//       //   props.showAlert("Invalid Credentials", "danger");
//       // }
//     }
//     // } else {
//     //   props.showAlert(
//     //     "Confirm Password must be same as the password",
//     //     "danger"
//     //   );
//   };

//   return (
//     <>
//     <div className="modal-background">
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <h3>Create Your Account</h3>
//         <div className={loader ? "parentDisable" : "display"}>
//           <Spinner />
//         </div>
//         <button
//           onClick={handleClick}
//         >
//           X
//         </button>
//         <label htmlFor="name">Full Name</label>
//         <input
//           type="text"
//           value={credentials.name}
//           name="name"
//           id="name"
//           onChange={onchange}
//           placeholder="Enter Your Name"
//           required
//         />

//         <label htmlFor="email">Email address</label>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={credentials.email}
//           id="email"
//           name="email"
//           onChange={onchange}
//           required
//         />

//         <label htmlFor="password">Password</label>
//         <input
//           type="password"
//           placeholder="Enter your Password"
//           value={credentials.password}
//           minLength={5}
//           id="password"
//           name="password"
//           onChange={onchange}
//           required
//         />

//         <label htmlFor="password">Confirm Password</label>
//         <input
//           type="password"
//           name="cpassword"
//           value={credentials.cpassword}
//           onChange={onchange}
//           minLength={5}
//           placeholder="Confirm your Password"
//           id="cpassword"
//           required
//         />

//         <div style={{ margin: "18px 0 0 66px" }}>
//           {" "}
//           Already have an Account? <Link to="/login">Login</Link>{" "}
//         </div>
//         <button className="login-button">Sign Up</button>
//         <div className="social">
//           <div className="go">
//             <i className="fab fa-google"></i>Google
//           </div>
//           <div className="fb">
//             <i className="fab fa-facebook"></i>Facebook
//           </div>
//         </div>
//       </form>
//       </div>
//     </>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import "../Styles/login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../Styles/newlogin.css";
import Spinner from './Spinner'

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
    const {name,email,password,cpassword}=credentials
    setLoader(true);
    const response = await fetch(
      `https://atharva-jagdale.herokuapp.com/api/auth/createuser`,
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
{loader && <Spinner/>}
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
