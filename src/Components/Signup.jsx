import React,{useState} from 'react'
import '../Styles/login.css'
import { useNavigate  } from "react-router-dom";
import { Link } from 'react-router-dom'
const  Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let navigate = useNavigate();

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); //this is mainly use to reflect the change in words on frontend
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password === credentials.cpassword) {
      const { name, email, password } = credentials;

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
      console.log(json);
      if (json.success) {
        //save auth-token and redirect
        // localStorage.setItem("token", json.authToken);
        e.preventDefault();
        props.showAlert("Account Created Successfully!!", "success");
        navigate("/login");
      } else {
        props.showAlert("Invalid Credentials", "danger");
      }
    } else {
      props.showAlert(
        "Confirm Password must be same as the password",
        "danger"
      );
    }
  };

  return (
    <>
    <div className="background">
    <div className="shape"></div>
    <div className="shape"></div>
</div>
<form className='signup-form' onSubmit={handleSubmit}>
    <h3>Create Your Account</h3>
    <label htmlFor="name" >Full Name</label>
    <input type="text" value={credentials.name} name="name" id="name" onChange={onchange} placeholder="Enter Your Name" required />
    
    <label htmlFor="email" >Email address</label>
    <input type="email" placeholder="Enter your email" value={credentials.email} id="email" name="email" onChange={onchange} required/>
    
    <label htmlFor="password" >Password</label>
    <input type="password" placeholder="Enter your Password" value={credentials.password} minLength={5} id="password" name="password" onChange={onchange} required/>

    <label htmlFor="password">Confirm Password</label>
    <input type="password" name="cpassword" value={credentials.cpassword} onChange={onchange} minLength={5} placeholder="Confirm your Password" id="cpassword" required/>
 
    <div style={{margin: "18px 0 0 66px"}}>  Already have an Account? <Link to="/login">Login</Link> </div>
    <button className='login-button'>Sign Up</button>
    <div className="social">
      <div className="go"><i className="fab fa-google"></i>Google</div>
      <div className="fb"><i className="fab fa-facebook"></i>Facebook</div>
    </div>
</form>
</>
  )
}

export default Signup
