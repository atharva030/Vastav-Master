import React from "react";
import "../Styles/Landing.css";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  let navigate = useNavigate();

  const handleClick = () => {
    if (localStorage.getItem("token")) {
      navigate("/notes");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div>
      <div className="home">
        <section className="home" id="home">
          <div className="content">
            <h1 className="text-big">We set your</h1>
            <h1 className="text-big">
              <Typewriter
                options={{
                  autoStart: true,
                  loop: true,
                  delay: 160,
                  strings: ["FOCUS", "TIME", "IDEA"],
                }}
              />
            </h1>

            <p className="text-small">
              Become focused, organized, and calm with Vastav.
              <p className="text-small">
                The world’s #1 task manager and to-do list app.
              </p>
            </p>

            <div className="home-btn">
              <button className="land-btn-first" onClick={handleClick}>
                Start Planning!
              </button>
              <button className="land-btn-second">Get started</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Landing;
