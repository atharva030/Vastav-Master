import React from 'react'
import '../Styles/Spinner.css'
import loader from '../Images/Spinner.gif'
const Spinner = () => {
  return (
    <div className="overlay-box">
        <img src={loader} alt="spinner"/>
    </div>
  )
}

export default Spinner