// import React,{useState} from 'react'
// import { useNavigate  } from "react-router-dom";
//  import { Link } from 'react-router-dom'
//  const Login = (props) => {

//     const [credentials, setCredentials] = useState({email:"",password:""})
//     let navigate =useNavigate ();

//     const onchange=(e)=>{
//         setCredentials({...credentials,[e.target.name]:e.target.value}) //this is mainly use to reflect the change in words on frontend
//       } 
//     const handleSubmit=async(e)=>{
//        e.preventDefault();
//        const response = await fetch(
//         `http://localhost:5000/api/auth/login`,
//         {
//           method: "POST", // *GET, POST, PUT, DELETE, etc.
//           headers: {
//             "Content-Type":"application/json",
//             // 'Content-Type': 'application/x-www-form-urlencoded',
//           },
//           body: JSON.stringify({email:credentials.email,password:credentials.password}), // body data type must match "Content-Type" header
//         }
//       );
//       const json=await response.json();
//         if(json.success){
//         //save auth-token and redirect
//         localStorage.setItem('token',json.authToken)
//         props.showAlert("You are successfully Logged in!","success")
//         navigate("/");
//       }
//       else{
//         props.showAlert("Check Your Credentials!","danger")
//       }
//     }
//   return (
//     <div className="container my-5">
//       <h2 className="text-center">Login Your Account</h2>
//         <form onSubmit={handleSubmit}>
//       <div className="mb-3">
//         <label htmlhtmlFor="email" className="form-label">Email address</label>
//         <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onchange} placeholder="Enter Your Email" aria-describedby="emailHelp"/>
//       </div>
//       <div className="mb-3">
//         <label htmlhtmlFor="exampleInputPassword1" className="form-label">Password</label>
//         <input type="password" name="password" value={credentials.password} className="form-control" placeholder="Enter your Password" onChange={onchange} id="password"/>
//       </div>
//       <p > Not an Account? <Link to="/signup">Sign Up</Link> </p>
//       <button type="submit" className="btn btn-primary" >Submit</button>
//     </form>
// </div>
//   )
// }

// export default Login

import React,{useState} from 'react'
import '../Styles/login.css'
import { useNavigate  } from "react-router-dom";
import { Link } from 'react-router-dom'
const Login = (props) => {
  const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate =useNavigate ();

    const onchange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value}) //this is mainly use to reflect the change in words on frontend
      } 
    const handleSubmit=async(e)=>{
       e.preventDefault();
       const response = await fetch(
        `http://localhost:5000/api/auth/login`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type":"application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify({email:credentials.email,password:credentials.password}), // body data type must match "Content-Type" header
        }
      );
      const json=await response.json();
        if(json.success){
        //save auth-token and redirect
        localStorage.setItem('token',json.authToken)
        props.showAlert("You are successfully Logged in!","success")
        navigate("/");
      }
      else{
        props.showAlert("Check Your Credentials!","danger")
      }
    }

  return (

    // <div className="container my-5">
    // //       <h2 className="text-center">Login Your Account</h2>
    // //         <form onSubmit={handleSubmit}>
    // //       <div className="mb-3">
    // //         <label htmlhtmlFor="email" className="form-label">Email address</label>
    // //         <input type="email" className="form-control" value={credentials.email} id="email" name="email" onChange={onchange} placeholder="Enter Your Email" aria-describedby="emailHelp"/>
    // //       </div>
    // //       <div className="mb-3">
    // //         <label htmlhtmlFor="exampleInputPassword1" className="form-label">Password</label>
    // //         <input type="password" name="password" value={credentials.password} className="form-control" placeholder="Enter your Password" onChange={onchange} id="password"/>
    // //       </div>
    // //       <p > Not an Account? <Link to="/signup">Sign Up</Link> </p>
    // //       <button type="submit" className="btn btn-primary" >Submit</button>
    // //     </form>
    // // </div>
    <>
    <div className="background">
    <div className="shape"></div>
    <div className="shape"></div>
</div>
<form className='login-form' onSubmit={handleSubmit}>
    <h3>Login Here</h3>
    <label htmlFor="email" >Email address</label>
    <input type="email" value={credentials.email} id="email" name="email" onChange={onchange} placeholder="Enter Your Email"  />

    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" name="password" value={credentials.password} placeholder="Enter your Password" onChange={onchange} id="password"/>

    <div style={{margin: "22px 0 0 29px"}}>  Don't Have an Account? <Link to="/signup">Sign Up</Link> </div>
    <button className='login-button'>Log In</button>
    <div className="social">
      <div className="go"><i className="fab fa-google"></i>  Google</div>
      <div className="fb"><i className="fab fa-facebook"></i>  Facebook</div>
    </div>
</form>
</>
  )
}

export default Login