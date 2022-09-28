import React from 'react'

const Landing = () => {
  return (
    <div>
      <div className="home">
        {/* <img src={logo} style={{ width: "65rem" }} /> */}
        <section className="home" id="home">
          <div className="content">
            <h1 className="text-big">Best Education using</h1>
            <h1 className="text-big">Best Technology</h1>
            <p className="text-small">
              This is the one of the best platform on which any student can
              learn diffrent Technology and make the world innovative
            </p>

            <a href="#">
              <button className="glow-on-hover">get started</button>
            </a>
          </div>
        </section>
      </div>
      <div className="middle-home">
        <section className="middle-home" id="about">
          <div className="middle-content">
            <h1 className="text-big">Simple and Super Fast</h1>
            <h1 className="text-big">onboarding Process</h1>
            <p className="text-small">
              On this platform you don't need any required knowledge. So, Why
              are you waiting ? Just give take off to your bright future !!
            </p>

            <a href="#">
              <button className="glow-on-hover">Start Now</button>
            </a>
          </div>
        </section>
        {/* <img
          src={middle}
          style={{ height: "45rem", width: " 45rem", margin: "0rem 0px" }}
        /> */}
      </div>
      </div>

  )
}

export default Landing