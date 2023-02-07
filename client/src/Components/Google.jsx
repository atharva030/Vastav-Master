// import React from "react";
// import { useState } from "react";
// import { GoogleLogin, GoogleLogout } from "react-google-login";
// import { BsGoogle, BsApple } from "react-icons/bs";

// const Google = () => {
//   const customStyle = {};
//   const [userinfo, setuserinfo] = useState({
//     name: "",
//     email: "",
//     authToken: "",
//   });
//   const onSuccess = async (res) => {
//     const { name, email, authToken } = userinfo;
//     setuserinfo({
//       name: res.profileObj.givenName,
//       email: res.profileObj.email,
//       authToken: res.tokenId,
//     });
//     const response = await fetch(`http://localhost:5000/api/auth/googlelogin`, {
//       method: "POST", // *GET, POST, PUT, DELETE, etc.
//       headers: {
//         "Content-Type": "application/json",
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       body: JSON.stringify({ name, email, authToken }), // body data type must match "Content-Type" header
//     });
//     const json = await response.json();

//     console.log(json);

//     if (json.success) {
//       //save auth-token and redirect
//       localStorage.setItem("token", res.tokenId);
//     }
//     console.log();
//   };
//   const onFailure = (res) => {
//     console.log("Login failed", res);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     console.log("jooo");
//   };

//   return (
//     <>
//       <div className="Flexing">
//         <GoogleLogin
//           clientId="975787396973-okldj0fgsgrsn8qr38eee9k83plppifg.apps.googleusercontent.com"
//           render={(renderProps) => (
//             <button
//               onClick={renderProps.onClick}
//               style={customStyle}
//               className="i-btn-grey"
//             >
//               <BsGoogle />
//               Continue with Google
//             </button>
//           )}
//           buttonText="Login"
//           onSuccess={onSuccess}
//           onFailure={onFailure}
//           cookiePolicy={"single_host_origin"}
//           isSignedIn={true}
//         />

//         {/* <GoogleLogout
//         clientId="975787396973-okldj0fgsgrsn8qr38eee9k83plppifg.apps.googleusercontent.com"
//         buttonText="Logout"
//         onLogoutSuccess={logout}
//       ></GoogleLogout> */}
//       </div>
//     </>
//   );
// };

// export default Google;
import React from 'react'

const Google = () => {
  return (
    <div>Google</div>
  )
}

export default Google