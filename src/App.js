import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/noteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Loginapi from "./Components/Signupgapi";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import Landing from "./Components/Landing";
import Google from "./Components/Google";
import { useEffect } from "react";
import {gapi} from 'gapi-script'
function App() {
  const [alert, setAlert] = useState(null);
  const [openModal, setopenModal] = useState(false)
  useEffect(() => {

  function start(){
    gapi.client.init({
      clientId:"975787396973-okldj0fgsgrsn8qr38eee9k83plppifg.apps.googleusercontent.com",
      scope:""
    })
  };
gapi.load('client:auth2',start)

  })
  

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };
  return (
    <>
       <NoteState>
        <Router>
          <Navbar showAlert={showAlert} openModal={setopenModal}/>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/notes" element={<Home showAlert={showAlert} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/" element={<Landing />} />
              <Route
                exact
                path="/signup"
                element={<Loginapi showAlert={showAlert} closeModal={setopenModal}/>}
              /> 
             <Route
                exact
                path="/login"
                element={openModal && <Login showAlert={showAlert} closeModal={setopenModal}/>}
              />
              
              {/* For internal Email */}
               <Route
                exact
                path="/signform"
                element={<Signup showAlert={showAlert} closeModal={setopenModal}/>}
              />
              <Route
                exact
                path="/signin"
                element={<Signin showAlert={showAlert} closeModal={setopenModal}/>}
              /> 

            </Routes>
          </div>
        </Router>

      </NoteState>
      {/* <Google/> */}
    </>
  );
}

export default App;
