import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar"

import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/noteState";
import Alert from "./Components/Alert";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
function App() {
  const [alert, setAlert] = useState(null)
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
            <Navbar showAlert={showAlert}/>           
            <Alert alert={alert}/>
            <div className="container">
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert}/>} />
                <Route exact path="/about" element={<About/>} />
                <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
                <Route exact path="/signup" element={<Signup showAlert={showAlert}/>} />
              </Routes>
            </div>
          </Router>
        </NoteState>  
    </>
  );
}

export default App;
